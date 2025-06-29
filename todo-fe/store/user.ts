// import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// import cookies from "js-cookie";

// type AuthStates = {
//   user: User | null;
//   token: string | null;
//   login: (user: User, token: string) => void;
//   logout: () => void;
//   setUser: (user: User) => void;
// };

// export const useAuth = create<AuthStates>((set) => ({
//   user: null,
//   token: null,

//   login: (user, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userId", user.id);
//     cookies.set("token", token, {
//       expires: 1,
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//     });
//     set({ user, token });
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     cookies.remove("token");
//     set({ user: null, token: null });
//   },

//   setUser: (user) => set({ user }),
// }));

// ------------------------------------

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthData = {
  user: User;
  token: string;
};

type AuthState = {
  data: AuthData;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setUT: (data: AuthData) => void;
  logout: () => void;
};

const initialAuthData: AuthData = {
  user: {
    id: "",
    email: "",
    username: "",
  },
  token: "",
};

export const useTodo = create<AuthState>()(
  persist(
    (set) => ({
      data: initialAuthData,
      setToken: (token) =>
        set((state) => ({
          data: {
            ...state.data,
            token,
          },
        })),
      setUser: (user) =>
        set((state) => ({
          data: {
            ...state.data,
            user,
          },
        })),
      setUT: (data) => set({ data }),
      logout: () => set({ data: initialAuthData }),
    }),
    {
      name: "session-auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
