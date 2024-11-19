import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState } from "../types/auth";
import { User, UserRole } from "../features/user/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        loading: false,
      }));
    } else {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: 1,
        first_name: "John",
        last_name: "Joe",
        email,
        role: UserRole.BUYER,
        phone_number: "+1 (555) 123-4567",
      };

      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user,
        loading: false,
      }));

      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Login failed",
        loading: false,
      }));
      throw error;
    }
  };

  const signup = async (userData: User) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user: User = {
        id: userData.id,
        first_name: userData.first_name || "",
        email: userData.email || "",
        role: userData.role || "buyer",
        phone_number: userData.phone_number,
      };

      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user,
        loading: false,
      }));

      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Signup failed",
        loading: false,
      }));
      throw error;
    }
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
