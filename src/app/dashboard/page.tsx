"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {

    const {
        user,
        loading,
    } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (loading) return;

        if (!user) {

            router.replace("/login");

            return;

        }

        switch (user.role) {

            case "ADMIN":

                router.replace("/dashboard/admin");

                break;

            case "OPERATOR":

                router.replace("/dashboard/operator");

                break;

            case "PIMPINAN":

                router.replace("/dashboard/pimpinan");

                break;

            default:

                router.replace("/login");

        }

    }, [loading, user, router]);

    return (

        <div className="flex items-center justify-center h-screen">

            Mengalihkan...

        </div>

    );

}