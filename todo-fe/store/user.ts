import { create } from "zustand";
import Cookies from "js-cookie";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    Cookies.set("token", token, {
      expires: 1,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    Cookies.remove("token");
    set({ user: null, token: null });
  },

  setUser: (user) => set({ user }),
}));
