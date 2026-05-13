import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import {
  authApi, profilesApi, mentorsApi, reviewsApi, bookingsApi, chatsApi,
  tokenStore, ApiError,
  type ApiProfile,
} from "@/lib/api";
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
  session: { access_token: string } | null;
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

const avatarFor = (p?: ApiProfile | null) =>
  p?.avatar_url ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(p?.name || "U")}&background=d94080&color=fff&size=200`;

const profileCache = new Map<string, ApiProfile | null>();
async function getProfile(userId: string): Promise<ApiProfile | null> {
  if (profileCache.has(userId)) return profileCache.get(userId) ?? null;
  try {
    const p = await profilesApi.byUser(userId);
    profileCache.set(userId, p);
    return p;
  } catch {
    profileCache.set(userId, null);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(tokenStore.get());
  const [loading, setLoading] = useState(true);
  const [customMentors, setCustomMentors] = useState<Mentor[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const hydrateUser = useCallback(async () => {
    try {
      const [me, profile, roles] = await Promise.all([
        authApi.me(),
        profilesApi.me().catch(() => null),
        profilesApi.roles().catch(() => ({ roles: [] as any[] })),
      ]);
      const role: UserRole =
        roles.roles?.includes("mentor") || profile?.role === "mentor" ? "mentor" : "student";
      setUser({
        id: me.id,
        email: me.email,
        name: profile?.name || me.email.split("@")[0],
        role,
        avatar: profile?.avatar_url || undefined,
      });
    } catch {
      tokenStore.clear();
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (token) await hydrateUser();
      setLoading(false);
    })();
  }, [token, hydrateUser]);

  // ---------- Mentors ----------
  const refreshMentors = useCallback(async () => {
    try {
      const rows = await mentorsApi.list();
      setCustomMentors(
        rows.map(([ad, prof]) => {
          const subs = (ad.subjects || "").split(",").map((s) => s.trim()).filter(Boolean);
          return {
            id: ad.id,
            name: prof?.name || "Mentor",
            avatar: avatarFor(prof),
            subject: subs[0] || "",
            subjects: subs,
            rating: 0,
            reviewCount: 0,
            price: ad.price,
            experience: ad.experience,
            bio: prof?.bio || "",
            longBio: ad.long_bio || prof?.bio || "",
            education: ad.education || "",
            languages: (ad.languages || "").split(",").map((s) => s.trim()).filter(Boolean),
            location: ad.location || "",
            available: ad.available,
            reviews: [],
          };
        })
      );
    } catch (e) {
      // backend offline — keep existing (possibly empty)
      console.warn("[mentors] failed to load:", (e as Error).message);
    }
  }, []);

  useEffect(() => { refreshMentors(); }, [refreshMentors]);

  // ---------- Reviews (load all once + when user changes) ----------
  const refreshReviews = useCallback(async () => {
    try {
      const list = await reviewsApi.list();
      const enriched = await Promise.all(list.map(async (r) => {
        const p = await getProfile(r.author_id);
        return {
          id: r.id,
          mentorId: r.mentor_id,
          author: p?.name || "Anonymous",
          text: r.comment,
          rating: r.rating,
          date: "",
        } as UserReview;
      }));
      setUserReviews(enriched);
    } catch {/* ignore */}
  }, []);
  useEffect(() => { refreshReviews(); }, [refreshReviews]);

  // ---------- Bookings ----------
  const refreshBookings = useCallback(async () => {
    if (!user) { setBookings([]); return; }
    try {
      const list = await bookingsApi.list();
      const enriched: Booking[] = await Promise.all(list.map(async (b) => {
        const [mentor, student] = await Promise.all([
          getProfile(b.mentor_id), getProfile(b.student_id),
        ]);
        const status: Booking["status"] =
          b.status === "cancelled" ? "cancelled" :
          b.status === "completed" ? "completed" : "upcoming";
        const fallback = b.booking_date ? new Date(b.booking_date) : new Date();
        return {
          id: b.id,
          mentorId: b.mentor_id,
          mentorName: mentor?.name || "Mentor",
          mentorAvatar: avatarFor(mentor),
          studentId: b.student_id,
          studentName: student?.name || "Student",
          date: b.meeting_date || fallback.toISOString().slice(0, 10),
          time: b.meeting_time || fallback.toTimeString().slice(0, 5),
          subject: b.subject || "",
          status,
          price: b.price ?? 0,
        };
      }));
      setBookings(enriched);
    } catch {/* ignore */}
  }, [user]);
  useEffect(() => { refreshBookings(); }, [refreshBookings]);

  // ---------- Chats (poll every 6s for new messages) ----------
  const refreshChats = useCallback(async () => {
    if (!user) { setChats([]); return; }
    try {
      const list = await chatsApi.list();
      const built = await Promise.all(list.map(async (c) => {
        const otherId = c.student_id === user.id ? c.mentor_id : c.student_id;
        const [me, other, msgs] = await Promise.all([
          getProfile(user.id),
          getProfile(otherId),
          chatsApi.messages(c.id).catch(() => []),
        ]);
        return {
          id: c.id,
          participantIds: [c.student_id, c.mentor_id],
          participantNames: {
            [user.id]: me?.name || "Me",
            [otherId]: other?.name || "User",
          },
          participantAvatars: {
            [user.id]: avatarFor(me),
            [otherId]: avatarFor(other),
          },
          messages: msgs.map((m) => ({
            id: m.id, senderId: m.sender_id, text: m.text, timestamp: m.sent_at,
          })),
        } as Chat;
      }));
      setChats(built);
    } catch {/* ignore */}
  }, [user]);
  useEffect(() => {
    refreshChats();
    if (!user) return;
    const i = setInterval(refreshChats, 6000);
    return () => clearInterval(i);
  }, [refreshChats, user]);

  // ---------- Auth actions ----------
  const login = async (email: string, password: string) => {
    try {
      const { access_token } = await authApi.login(email, password);
      tokenStore.set(access_token);
      setToken(access_token);
      return {};
    } catch (e) {
      return { error: (e as Error).message };
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const { access_token } = await authApi.signup(name, email, password, role);
      tokenStore.set(access_token);
      setToken(access_token);
      return {};
    } catch (e) {
      return { error: (e as Error).message };
    }
  };

  const logout = async () => {
    try { await authApi.logout(); } catch {/* ignore */}
    tokenStore.clear();
    setToken(null);
    setUser(null);
    profileCache.clear();
  };

  const addCustomMentor = async (mentor: Omit<Mentor, "id" | "rating" | "reviewCount" | "reviews">) => {
    if (!user) return;
    try {
      await mentorsApi.create({
        subjects: mentor.subjects.join(","),
        price: mentor.price,
        experience: mentor.experience,
        available: mentor.available,
        education: mentor.education || null,
        languages: (mentor.languages || []).join(","),
        location: mentor.location || null,
        long_bio: mentor.longBio || mentor.bio || null,
      });
      if (mentor.name || mentor.bio) {
        try { await profilesApi.patch(mentor.name, mentor.bio); } catch {/* ignore */}
      }
      await refreshMentors();
    } catch (e) {
      throw new ApiError((e as Error).message, (e as ApiError).status ?? 0);
    }
  };

  const addReview = async (review: Omit<UserReview, "id">) => {
    if (!user) return;
    await reviewsApi.create(review.mentorId, review.rating, review.text);
    await refreshReviews();
  };

  const addBooking = async (booking: Omit<Booking, "id">) => {
    if (!user) return;
    await bookingsApi.create({
      mentor_id: booking.mentorId,
      subject: booking.subject,
      price: booking.price,
      meeting_date: booking.date,
      meeting_time: booking.time,
    });
    await refreshBookings();
  };

  const cancelBooking = async (bookingId: string) => {
    await bookingsApi.patchStatus(bookingId, "cancelled");
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)));
  };

  const getOrCreateChat = async (mentorId: string) => {
    if (!user) return "";
    // Look in cached chats first
    const existing = chats.find((c) => c.participantIds.includes(mentorId));
    if (existing) return existing.id;
    const c = await chatsApi.create(mentorId);
    await refreshChats();
    return c.id;
  };

  const sendMessage = async (chatId: string, text: string) => {
    if (!user) return;
    await chatsApi.send(chatId, text);
    await refreshChats();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session: token ? { access_token: token } : null,
        loading,
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
