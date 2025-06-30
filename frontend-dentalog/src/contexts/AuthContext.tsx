import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import type { User } from "../types";

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
    const savedUser = localStorage.getItem("dentalog_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const csrftoken = Cookies.get("csrftoken") || "";

    try {
      console.log("no no ");

      // const response = await fetch(
      //   "http://django-env.eba-3ppwu5a9.us-west-2.elasticbeanstalk.com",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "X-CSRFToken": csrftoken,
      //     },
      //     body: JSON.stringify({ email, password }),
      //   }
      // );
      const response = await axios.post(
        "http://django-env.eba-3ppwu5a9.us-west-2.elasticbeanstalk.com/auth/login/",
        // "http://127.0.0.1:8000/auth/login/",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true, // Importante si tu backend requiere cookies
        }
      );

      // if (!response.ok) {
      //   return false;
      // }
      console.log("si si");
      console.log(response);

      const data = await response.data;

      const mockUser: User = {
        id: String(data.user.id_user),
        id_user: data.user.id_user,
        created_at: data.user.created_at,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        name: `${data.user.first_name} ${data.user.last_name}`,
        phone_number: data.user.phone_number,
        profile_photo_url: data.user.profile_photo_url,
        role: data.user.role,
        is_active: data.user.is_active,
        last_login: data.user.last_login,
        updated_at: data.user.updated_at,
        email: data.user.email,
        token: data.token, // el token viene fuera de user
      };

      // const mockUser: User = {
      //   id: data.user.id_user,
      //   name: data.user.first_name,
      //   email: data.user.email,
      //   role: data.user.role,
      //   token: data.user.token,
      // };

      console.log(data);

      console.log(mockUser);

      setUser(mockUser);
      localStorage.setItem("dentalog_user", JSON.stringify(mockUser));
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
