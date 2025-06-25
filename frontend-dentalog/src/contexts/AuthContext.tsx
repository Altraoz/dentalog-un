import React, { createContext, useContext, useState, useEffect } from "react";
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
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

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
