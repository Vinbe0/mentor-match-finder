import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User as SbUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Mentor } from "@/data/mentors";

export type UserRole = "student" | "mentor";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface UserReview {
  id?: string;
  mentorId: string;
  author: string;
  text: string;
  rating: number;
  date: string;
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  participantIds: string[];
  participantNames: Record<string, string>;
  participantAvatars: Record<string, string>;
  messages: ChatMessage[];
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  customMentors: Mentor[];
  refreshMentors: () => Promise<void>;
  addCustomMentor: (mentor: Omit<Mentor, "id" | "rating" | "reviewCount" | "reviews">) => Promise<void>;
  userReviews: UserReview[];
  addReview: (review: Omit<UserReview, "id">) => Promise<void>;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id">) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  chats: Chat[];
  getOrCreateChat: (mentorId: string, mentorName: string, mentorAvatar: string) => Promise<string>;
  sendMessage: (chatId: string, text: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const buildAppUser = async (sbUser: SbUser): Promise<AppUser> => {
  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("name, avatar_url").eq("user_id", sbUser.id).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", sbUser.id),
  ]);
  const role: UserRole = roles?.some((r: any) => r.role === "mentor") ? "mentor" : "student";
  return {
    id: sbUser.id,
    name: profile?.name ?? sbUser.email?.split("@")[0] ?? "User",
    email: sbUser.email ?? "",
    role,
    avatar: profile?.avatar_url ?? undefined,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [customMentors, setCustomMentors] = useState<Mentor[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  // Auth state
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess?.user) {
        // defer profile fetch
        setTimeout(() => buildAppUser(sess.user).then(setUser), 0);
      } else {
        setUser(null);
      }
    });
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) setUser(await buildAppUser(data.session.user));
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const refreshMentors = async () => {
    const { data } = await supabase.from("mentor_ads").select("*").order("created_at", { ascending: false });
    if (!data) return;
    setCustomMentors(
      data.map((a: any) => ({
        id: a.user_id,
        name: a.name,
        avatar: a.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=d94080&color=fff&size=200`,
        subject: a.subjects?.[0] ?? "",
        subjects: a.subjects ?? [],
        rating: 0,
        reviewCount: 0,
        price: a.price ?? 0,
        experience: a.experience ?? 0,
        bio: a.bio ?? "",
        longBio: a.long_bio ?? a.bio ?? "",
        education: a.education ?? "",
        languages: a.languages ?? [],
        location: a.location ?? "",
        available: a.available,
        reviews: [],
      }))
    );
  };

  useEffect(() => {
    refreshMentors();
  }, []);

  // Reviews (all reviews, all mentors)
  const refreshReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (!data) return;
    setUserReviews(
      data.map((r: any) => ({
        id: r.id,
        mentorId: r.mentor_id,
        author: r.author_name,
        text: r.text,
        rating: r.rating,
        date: new Date(r.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      }))
    );
  };
  useEffect(() => { refreshReviews(); }, []);

  // Bookings (per user)
  useEffect(() => {
    if (!user) { setBookings([]); return; }
    const load = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .or(`student_id.eq.${user.id},mentor_id.eq.${user.id}`)
        .order("date", { ascending: false });
      if (!data) return;
      setBookings(data.map((b: any) => ({
        id: b.id,
        mentorId: b.mentor_id,
        mentorName: b.mentor_name,
        mentorAvatar: b.mentor_avatar ?? "",
        studentId: b.student_id,
        studentName: b.student_name,
        date: b.date,
        time: b.time,
        subject: b.subject,
        status: b.status,
        price: b.price,
      })));
    };
    load();
  }, [user]);

  // Chats (per user) + messages + realtime
  const loadChats = async (uid: string) => {
    const { data: chatRows } = await supabase
      .from("chats")
      .select("*")
      .or(`student_id.eq.${uid},mentor_id.eq.${uid}`);
    if (!chatRows) return;
    const ids = chatRows.map((c: any) => c.id);
    const { data: msgs } = ids.length
      ? await supabase.from("messages").select("*").in("chat_id", ids).order("created_at")
      : { data: [] as any[] };
    // fetch participant profiles
    const otherIds = Array.from(new Set(chatRows.map((c: any) => c.student_id === uid ? c.mentor_id : c.student_id)));
    const { data: profiles } = otherIds.length
      ? await supabase.from("profiles").select("user_id, name, avatar_url").in("user_id", otherIds)
      : { data: [] as any[] };
    const myProfile = await supabase.from("profiles").select("name, avatar_url").eq("user_id", uid).maybeSingle();

    setChats(chatRows.map((c: any) => {
      const otherId = c.student_id === uid ? c.mentor_id : c.student_id;
      const otherP = profiles?.find((p: any) => p.user_id === otherId);
      return {
        id: c.id,
        participantIds: [c.student_id, c.mentor_id],
        participantNames: {
          [uid]: myProfile.data?.name ?? "Me",
          [otherId]: otherP?.name ?? "User",
        },
        participantAvatars: {
          [uid]: myProfile.data?.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(myProfile.data?.name ?? "Me")}`,
          [otherId]: otherP?.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(otherP?.name ?? "U")}`,
        },
        messages: (msgs ?? []).filter((m: any) => m.chat_id === c.id).map((m: any) => ({
          id: m.id,
          senderId: m.sender_id,
          text: m.text,
          timestamp: m.created_at,
        })),
      };
    }));
  };

  useEffect(() => {
    if (!user) { setChats([]); return; }
    loadChats(user.id);
    const channel = supabase
      .channel("messages-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
        loadChats(user.id);
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chats" }, () => {
        loadChats(user.id);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { name, role },
      },
    });
    return { error: error?.message };
  };

  const logout = async () => { await supabase.auth.signOut(); };

  const addCustomMentor = async (mentor: Omit<Mentor, "id" | "rating" | "reviewCount" | "reviews">) => {
    if (!user) return;
    await supabase.from("mentor_ads").insert({
      user_id: user.id,
      name: mentor.name,
      avatar_url: mentor.avatar,
      subjects: mentor.subjects,
      price: mentor.price,
      experience: mentor.experience,
      bio: mentor.bio,
      long_bio: mentor.longBio,
      education: mentor.education,
      languages: mentor.languages,
      location: mentor.location,
      available: mentor.available,
    });
    await refreshMentors();
  };

  const addReview = async (review: Omit<UserReview, "id">) => {
    if (!user) return;
    await supabase.from("reviews").insert({
      mentor_id: review.mentorId,
      author_id: user.id,
      author_name: review.author,
      text: review.text,
      rating: review.rating,
    });
    await refreshReviews();
  };

  const addBooking = async (booking: Omit<Booking, "id">) => {
    if (!user) return;
    const { data } = await supabase.from("bookings").insert({
      student_id: booking.studentId,
      mentor_id: booking.mentorId,
      mentor_name: booking.mentorName,
      mentor_avatar: booking.mentorAvatar,
      student_name: booking.studentName,
      date: booking.date,
      time: booking.time,
      subject: booking.subject,
      status: booking.status,
      price: booking.price,
    }).select().single();
    if (data) {
      setBookings((prev) => [{
        id: data.id,
        mentorId: data.mentor_id,
        mentorName: data.mentor_name,
        mentorAvatar: data.mentor_avatar ?? "",
        studentId: data.student_id,
        studentName: data.student_name,
        date: data.date,
        time: data.time,
        subject: data.subject,
        status: data.status,
        price: data.price,
      }, ...prev]);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    await supabase.from("bookings").update({ status: "cancelled" }).eq("id", bookingId);
    setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: "cancelled" } : b));
  };

  const getOrCreateChat = async (mentorId: string, _mentorName: string, _mentorAvatar: string) => {
    if (!user) return "";
    // Find existing
    const { data: existing } = await supabase
      .from("chats")
      .select("id")
      .or(`and(student_id.eq.${user.id},mentor_id.eq.${mentorId}),and(student_id.eq.${mentorId},mentor_id.eq.${user.id})`)
      .maybeSingle();
    if (existing) return existing.id;

    const studentId = user.role === "mentor" ? mentorId : user.id;
    const mId = user.role === "mentor" ? user.id : mentorId;
    const { data, error } = await supabase.from("chats").insert({
      student_id: studentId,
      mentor_id: mId,
    }).select().single();
    if (error || !data) return "";
    await loadChats(user.id);
    return data.id;
  };

  const sendMessage = async (chatId: string, text: string) => {
    if (!user) return;
    await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: user.id,
      text,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user, session, loading,
        login, signup, logout,
        customMentors, refreshMentors, addCustomMentor,
        userReviews, addReview,
        bookings, addBooking, cancelBooking,
        chats, getOrCreateChat, sendMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
