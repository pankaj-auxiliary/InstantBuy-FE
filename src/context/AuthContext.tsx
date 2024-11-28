import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState } from "../types/auth";
import { User, UserRole } from "../features/user/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../app/store";
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

  useEffect(() => {
    // Check for stored auth state
    const authToken = localStorageService.getAuthToken();
    const storedUser = localStorage.getItem("user");

    if (authToken && storedUser) {
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
      const payload = { email, password };
      let user: User | null;
      // Simulate API call
      await new Promise((resolve, reject) => {
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
            console.log("state", state);
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

      // Simulate API call
      await new Promise(() => dispatch(signupRequest(userData)));

      const user = useSelector((state: RootState) => state.auth.user);

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
