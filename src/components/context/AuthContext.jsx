
import React, { createContext, useEffect, useState } from "react";
import api from "../../api/axiosClient.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [loading, setLoading] = useState(false);

  // keep localStorage in sync
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // optional: try refresh user on mount if token exists
  useEffect(() => {
    const tryLoadUser = async () => {
      if (!token || user) return;
      setLoading(true);
      try {
        // you can create an endpoint /auth/me to return current user; 
        // if you don't have it, skip this request.
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.warn("Could not refresh user:", err?.response?.data ?? err.message);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    tryLoadUser();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{
      token, setToken, user, setUser, loading, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
