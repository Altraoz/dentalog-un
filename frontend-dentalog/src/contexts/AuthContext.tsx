import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import type { User } from "../types";
import { url_backend } from "../api/variables";
import { configureAxiosInterceptor } from "../api/authentication";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  isDoctor?: boolean;
  isPatient?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    configureAxiosInterceptor(logout);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("dentalog_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const csrftoken = Cookies.get("csrftoken") || "";

    try {
      console.log("no no ");
      const response = await axios.post(
        `${url_backend}/auth/login/`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        }
      );

      console.log("si si");
      console.log(response);

      const data = await response.data;

      const user: User = {
        id: String(data.user.id_user),
        id_user: data.user.id_user,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        name: `${data.user.first_name} ${data.user.last_name}`,
        profile_photo_url: data.user.profile_photo_url,
        role: data.user.role,
        last_login: data.user.last_login,
        email: data.user.email,
        token: data.token, // el token viene fuera de user
      };

      setUser(user);
      localStorage.setItem("dentalog_user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dentalog_user");
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
