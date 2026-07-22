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

import BaseLayout from "./BaseLayout";

type Props = {

  children: React.ReactNode;

  roles: string[];

  navbar: React.ReactNode;

  sidebar: React.ReactNode;

};

export default function ProtectedLayout({

  children,

  roles,

  navbar,

  sidebar,

}: Props) {

  const router =
    useRouter();

  const {

    user,

    loading,

  } = useAuth();

  useEffect(() => {

    if (loading) return;

    if (!user) {

      router.replace("/login");

      return;

    }

    if (!roles.includes(user.role)) {

        router.replace("/login");

    }

  }, [
    user,
    loading,
    roles,
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

  if (!roles.includes(user.role)) {

        return null;

    }

  return (

    <BaseLayout

      navbar={navbar}

      sidebar={sidebar}

    >

      {children}

    </BaseLayout>

  );

}