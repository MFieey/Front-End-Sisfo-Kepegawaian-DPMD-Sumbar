"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home(){

    const {
        user,
        loading,
    } = useAuth();

    const router =
        useRouter();

    useEffect(()=>{

        if(loading) return;

        if(!user){

            router.replace("/login");

            return;

        }

        switch(user.role){

            case "ADMIN":

                router.replace("/dashboard");

                break;

            case "OPERATOR":

                router.replace("/dashboard/operator");

                break;

            case "PIMPINAN":

                router.replace("/dashboard/pimpinan");

                break;

        }

    },[user,loading]);

    return null;

}