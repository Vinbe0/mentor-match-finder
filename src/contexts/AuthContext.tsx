import { createContext, useContext, useState, ReactNode } from "react";
import type { Mentor } from "@/data/mentors";

export type UserRole = "student" | "mentor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserReview {
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
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  customMentors: Mentor[];
  addCustomMentor: (mentor: Mentor) => void;
  userReviews: UserReview[];
  addReview: (review: UserReview) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  chats: Chat[];
  getOrCreateChat: (mentorId: string, mentorName: string, mentorAvatar: string) => string;
  sendMessage: (chatId: string, text: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [customMentors, setCustomMentors] = useState<Mentor[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const login = (_email: string, _password: string, role: UserRole) => {
    setUser({
      id: crypto.randomUUID(),
      name: role === "mentor" ? "Mentor User" : "Student User",
      email: _email,
      role,
    });
  };

  const signup = (name: string, email: string, _password: string, role: UserRole) => {
    setUser({ id: crypto.randomUUID(), name, email, role });
  };

  const logout = () => setUser(null);

  const addCustomMentor = (mentor: Mentor) => {
    setCustomMentors((prev) => [...prev, mentor]);
  };

  const addReview = (review: UserReview) => {
    setUserReviews((prev) => [...prev, review]);
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" as const } : b))
    );
  };

  const getOrCreateChat = (mentorId: string, mentorName: string, mentorAvatar: string) => {
    if (!user) return "";
    const existing = chats.find(
      (c) => c.participantIds.includes(user.id) && c.participantIds.includes(mentorId)
    );
    if (existing) return existing.id;

    const newChat: Chat = {
      id: crypto.randomUUID(),
      participantIds: [user.id, mentorId],
      participantNames: { [user.id]: user.name, [mentorId]: mentorName },
      participantAvatars: {
        [user.id]: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`,
        [mentorId]: mentorAvatar,
      },
      messages: [],
    };
    setChats((prev) => [...prev, newChat]);
    return newChat.id;
  };

  const sendMessage = (chatId: string, text: string) => {
    if (!user) return;
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      senderId: user.id,
      text,
      timestamp: new Date().toISOString(),
    };
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user, login, signup, logout,
        customMentors, addCustomMentor,
        userReviews, addReview,
        bookings, addBooking, cancelBooking,
        chats, getOrCreateChat, sendMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
