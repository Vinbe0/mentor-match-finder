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

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  customMentors: Mentor[];
  addCustomMentor: (mentor: Mentor) => void;
  userReviews: UserReview[];
  addReview: (review: UserReview) => void;
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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, customMentors, addCustomMentor, userReviews, addReview }}>
      {children}
    </AuthContext.Provider>
  );
};
