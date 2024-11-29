import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState } from "../types/auth";
import { User, UserRole } from "../features/user/types";
import { useDispatch } from "react-redux";
import { store } from "../app/store";
import { localStorageService } from "../services/LocalStorageService";
import { loginRequest, signupRequest } from "../features/auth/slice";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;

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
  const dispatch = useDispatch();

  let authToken;

  useEffect(() => {
    // Check for stored auth state
    authToken = localStorageService.getAuthToken();
    const storedUser = localStorage.getItem("user");
    const user: User = storedUser ? JSON.parse(storedUser).data : null;
    console.log("Auth state:", { authToken, user }, !!authToken, !!user);

    if (authToken && user) {
      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: user,
        loading: false,
      }));
    } else {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const payload = { email, password };
      let user: User | null;
      // Simulate API call
      await new Promise((resolve) => {
        dispatch(loginRequest(payload));
        // Assuming loginRequest is an async action, you might want to listen for the result
        // You can use a callback or a listener to resolve the promise
        const unsubscribe = store.subscribe(() => {
          user = store.getState().auth.user;
          if (user) {
            setState((prev) => ({
              ...prev,
              isAuthenticated: true,
              user,
              loading: false,
            }));
            localStorage.setItem("user", JSON.stringify(user));
            resolve(user); // Resolve with user data
            unsubscribe(); // Clean up the listener
          }
        });
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Login failed",
        loading: false,
      }));
      throw error;
    }
  };

  const signup = async (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: UserRole;
  }) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      let user: User | null;
      // Simulate API call
      await new Promise((resolve) => {
        dispatch(signupRequest(userData));
        // Assuming loginRequest is an async action, you might want to listen for the result
        // You can use a callback or a listener to resolve the promise
        const unsubscribe = store.subscribe(() => {
          user = store.getState().auth.user;
          if (user) {
            setState((prev) => ({
              ...prev,
              isAuthenticated: true,
              user,
              loading: false,
            }));
            localStorage.setItem("user", JSON.stringify(user));
            resolve(user); // Resolve with user data
            unsubscribe(); // Clean up the listener
          }
        });
      });
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
      <div>{children}</div>
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
