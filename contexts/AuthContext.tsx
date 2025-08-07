"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "donor" | "patient" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    role: "donor" | "patient" | "admin"
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults for cookie handling
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://bank-back-rni1.onrender.com";

// Add response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      window.location.href = "/login/donor";
    }
    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // Try to get user info with existing cookie
      const response = await axios.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      // No valid session, user not logged in
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    role: "donor" | "patient" | "admin"
  ) => {
    try {
      let endpoint = "";
      switch (role) {
        case "donor":
          endpoint = "/donor-login";
          break;
        case "patient":
          endpoint = "/patient-login";
          break;
        case "admin":
          endpoint = "/admin-login";
          break;
      }

      const response = await axios.post(endpoint, { email, password });

      // Set user data with role
      setUser({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        role: role,
      });

      // Redirect to appropriate dashboard
      window.location.href = `/dashboard/${role}`;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
    } catch (error) {
      // Even if logout fails on backend, clear frontend state
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      window.location.href = "/login/donor";
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
