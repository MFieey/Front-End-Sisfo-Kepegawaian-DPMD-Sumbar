"use client";

import { useAuth } from "@/contexts/AuthContext";

import AdminLayout from "./AdminLayout";
import OperatorLayout from "./OperatorLayout";

export default function ManagementLayout({
    children,
}:{
    children:React.ReactNode;
}){

    const { user } = useAuth();

    if(!user) return null;

    if(user.role==="ADMIN"){

        return(

            <AdminLayout>

                {children}

            </AdminLayout>

        );

    }

    if(user.role==="OPERATOR"){

        return(

            <OperatorLayout>

                {children}

            </OperatorLayout>

        );

    }

    return null;

}