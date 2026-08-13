import React, { createContext, useContext, useState } from "react";
import { api } from "../api.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "ct-ecomm-auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  async function login({ userId, email, mobile }) {
    const { token, user } = await api.login({ userId, email, mobile });
    const session = { token, user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setAuth(session);
    return session;
  }

  function logout() {
    if (auth?.token) {
      api.logout(auth.token).catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }

  const value = {
    user: auth?.user || null,
    token: auth?.token || null,
    isLoggedIn: !!auth?.user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
