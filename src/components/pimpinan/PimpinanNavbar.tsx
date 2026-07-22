"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/services/auth.service";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();

  const {
    user,
    refreshUser,
  } = useAuth();

  const handleLogout = async () => {

    const result = await Swal.fire({

        title: "Logout ?",

        text: "Apakah Anda yakin ingin keluar?",

        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Ya",

        cancelButtonText: "Batal",

        confirmButtonColor: "#15803D",

        cancelButtonColor: "#DC2626",

    });

    if (!result.isConfirmed) return;

    await logout();

    await Swal.fire({

        icon: "success",

        title: "Logout Berhasil",

        text: "Sampai jumpa kembali.",

        timer: 1200,

        showConfirmButton: false,

    });

    router.push("/login");

  }

  return (

    <header
    className="
    bg-white
    border-b
    border-green-200
    h-16
    flex
    items-center
    justify-between
    px-8
    shadow-sm
    "
    >

    <div>

    <h1
    className="
    text-xl
    font-bold
    text-green-800
    "
    >

    Dashboard Eksekutif

    </h1>

    <p
    className="
    text-sm
    text-gray-500
    "
    >

    Sistem Informasi Manajemen Kepegawaian

    </p>

    </div>

    <div
    className="
    flex
    items-center
    gap-5
    "
    >

    <div
    className="
    text-right
    "
    >

    <p
    className="
    font-semibold
    text-green-800
    "
    >

    {user?.nama}

    </p>

    <p
    className="
    text-xs
    text-gray-500
    "
    >

    Pimpinan

    </p>

    </div>

    <button

    onClick={handleLogout}

    className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-4
    py-2
    rounded-lg
    transition
    "

    >

    Logout

    </button>

    </div>

    </header>

    );
}