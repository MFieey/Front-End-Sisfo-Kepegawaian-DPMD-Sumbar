"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { me } from "@/services/auth.service";

type User = {
  id: number;
  nama: string;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: () => {},
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser =
    async () => {
      try {
        const response =
          await me();

        setUser(response.data);
      } catch {

          setUser(null);

          console.log(
              "Session tidak ditemukan"
          );

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth =
  () => useContext(AuthContext);