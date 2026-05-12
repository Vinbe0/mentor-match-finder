// Talimger backend API client (FastAPI, local dev)
// Override with VITE_API_BASE_URL if you deploy publicly.
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://127.0.0.1:8000";

const TOKEN_KEY = "talimger_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  form?: URLSearchParams;
  query?: Record<string, string | number | boolean | undefined | null>;
  auth?: boolean;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T = any>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, form, query, auth = true } = opts;
  const url = new URL(path.startsWith("http") ? path : `${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    });
  }

  const headers: Record<string, string> = {};
  if (auth) {
    const t = tokenStore.get();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }

  let payload: BodyInit | undefined;
  if (form) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    payload = form;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), { method, headers, body: payload });
  } catch (e: any) {
    throw new ApiError(
      `Cannot reach backend at ${API_BASE_URL}. Make sure FastAPI is running (uvicorn main:app --reload).`,
      0
    );
  }

  const ct = res.headers.get("content-type") ?? "";
  const data = ct.includes("application/json") ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const msg = (data && typeof data === "object" && "detail" in data ? (data as any).detail : data) || res.statusText;
    throw new ApiError(typeof msg === "string" ? msg : JSON.stringify(msg), res.status);
  }
  return data as T;
}

// ---------- Typed endpoints ----------

export type Role = "student" | "mentor" | "admin";

export interface ApiUser {
  id: string;
  email: string;
  email_verified?: boolean;
  created_at?: string;
}

export interface ApiProfile {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string | null;
  bio?: string | null;
  role: Role;
}

export interface ApiMentorAd {
  id: string;
  user_id: string;
  subjects: string; // comma-separated on backend
  price: number;
  experience: number;
  available: boolean;
}

export interface ApiBooking {
  id: string;
  mentor_id: string;
  student_id: string;
  status: string;
  booking_date: string;
}

export interface ApiReview {
  id: string;
  mentor_id: string;
  author_id: string;
  rating: number;
  comment: string;
}

export interface ApiChat {
  id: string;
  student_id: string;
  mentor_id: string;
  created_at: string;
}

export interface ApiMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  text: string;
  sent_at: string;
}

export const authApi = {
  signup: (name: string, email: string, password: string, role: Role) =>
    api<{ access_token: string; token_type: string }>("/auth/signup", {
      method: "POST",
      auth: false,
      query: { name, email, password, role },
    }),
  login: (email: string, password: string) => {
    const form = new URLSearchParams();
    form.set("username", email);
    form.set("password", password);
    return api<{ access_token: string; token_type: string }>("/auth/login", {
      method: "POST",
      auth: false,
      form,
    });
  },
  me: () => api<ApiUser>("/auth/me"),
  logout: () => api("/auth/logout", { method: "POST" }),
};

export const profilesApi = {
  me: () => api<ApiProfile>("/profiles/me"),
  byUser: (userId: string) => api<ApiProfile | null>(`/profiles/${userId}`, { auth: false }),
  patch: (name: string) => api<ApiProfile>("/profiles/me", { method: "PATCH", query: { name } }),
  roles: () => api<{ roles: Role[] }>("/roles/me"),
};

// Backend returns list of [MentorAd, Profile] tuples
export type MentorListRow = [ApiMentorAd, ApiProfile];

export const mentorsApi = {
  list: () => api<MentorListRow[]>("/mentors", { auth: false }),
  get: (id: string) => api<ApiMentorAd>(`/mentors/${id}`, { auth: false }),
  create: (ad: { subjects: string; price: number; experience: number; available: boolean }) =>
    api<ApiMentorAd>("/mentors", { method: "POST", body: ad }),
  patchPrice: (id: string, price: number) =>
    api<ApiMentorAd>(`/mentors/${id}`, { method: "PATCH", query: { price } }),
  remove: (id: string) => api(`/mentors/${id}`, { method: "DELETE" }),
};

export const reviewsApi = {
  list: () => api<ApiReview[]>("/reviews", { auth: false }),
  create: (mentor_id: string, rating: number, comment: string) =>
    api<ApiReview>("/reviews", { method: "POST", body: { mentor_id, rating, comment } }),
  remove: (id: string) => api(`/reviews/${id}`, { method: "DELETE" }),
};

export const bookingsApi = {
  list: () => api<ApiBooking[]>("/bookings"),
  create: (mentor_id: string) =>
    api<ApiBooking>("/bookings", { method: "POST", query: { mentor_id } }),
  patchStatus: (id: string, status: string) =>
    api<ApiBooking>(`/bookings/${id}`, { method: "PATCH", query: { status } }),
};

export const chatsApi = {
  list: () => api<ApiChat[]>("/chats"),
  create: (mentor_id: string) =>
    api<ApiChat>("/chats", { method: "POST", query: { mentor_id } }),
  messages: (chat_id: string) => api<ApiMessage[]>(`/messages/${chat_id}`),
  send: (chat_id: string, text: string) =>
    api<ApiMessage>("/messages", { method: "POST", query: { chat_id, text } }),
};
