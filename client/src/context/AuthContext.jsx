import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiClient, setAuthToken, getAuthToken, decodeJwt } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getAuthToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthToken(token || null);
    if (token) {
      const payload = decodeJwt(token);
      if (payload?.id || payload?._id) {
        setUser({ id: payload.id || payload._id, email: payload.email });
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await apiClient.post("/login", { email, password });
      const jwt = res?.data?.data;
      setToken(jwt);
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password, name }) => {
    setLoading(true);
    try {
      await apiClient.post("/signup", { email, password, name });
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, setUser, login, signup, logout, loading, isAuthenticated: Boolean(token) }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


