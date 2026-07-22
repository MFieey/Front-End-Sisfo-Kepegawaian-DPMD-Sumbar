"use client";

import ProtectedLayout from "./ProtectedLayout";

import AdminNavbar from "../admin/AdminNavbar";

import AdminSidebar from "../admin/AdminSidebar";

export default function AdminLayout({

  children,

}:{

  children:React.ReactNode

}){

  return(

    <ProtectedLayout

      roles={["ADMIN"]}

      navbar={<AdminNavbar/>}

      sidebar={<AdminSidebar/>}

      >

      {children}

    </ProtectedLayout>

  );

}