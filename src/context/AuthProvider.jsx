import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "./axiosInstance"; // adjust path if needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    return access && refresh ? { access, refresh, user: null } : null;
  });

  // 🔹 Fetch profile when tokens exist
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authTokens?.access) {
        try {
          const res = await axiosInstance.get("profile/"); // backend endpoint
          setAuthTokens((prev) => ({ ...prev, user: res.data })); // save user globally
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [authTokens?.access]);

  // 🔹 Login
  const login = async (tokens) => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    try {
      const res = await axiosInstance.get("profile/"); // fetch user on login
      setAuthTokens({ ...tokens, user: res.data });
    } catch (error) {
      console.error("Login successful, but profile fetch failed:", error);
      setAuthTokens({ ...tokens, user: null });
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthTokens(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
