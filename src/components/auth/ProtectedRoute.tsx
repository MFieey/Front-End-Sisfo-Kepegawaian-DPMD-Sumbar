"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/contexts/AuthContext";

type Props = {

  children: React.ReactNode;

  role?: string;

};

export default function ProtectedRoute({

  children,

  role,

}: Props) {

  const router =
    useRouter();

  const {

    user,

    loading,

  } = useAuth();

  useEffect(() => {

    if (loading) return;

    // Belum login
    if (!user) {

      router.replace("/login");

      return;

    }

    // Salah role
    if (
      role &&
      user.role !== role
    ) {

      router.replace("/login");

    }

  }, [
    loading,
    user,
    role,
    router,
  ]);

  if (loading) {

    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-screen
        "
      >

        Loading...

      </div>
    );

  }

  if (!user) {

    return null;

  }

  if (
    role &&
    user.role !== role
  ) {

    return null;

  }

  return <>{children}</>;

}