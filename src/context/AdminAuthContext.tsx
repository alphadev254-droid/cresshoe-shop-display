import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { validateCredentials } from "@/config/adminCredentials";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem("admin_session");
    if (session) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const isValid = await validateCredentials(username, password);
      
      if (isValid) {
        localStorage.setItem("admin_session", JSON.stringify({ username, timestamp: Date.now() }));
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: "Invalid username or password" };
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_session");
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
