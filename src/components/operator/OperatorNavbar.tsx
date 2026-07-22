"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/services/auth.service";
import Swal from "sweetalert2";

export default function OperatorNavbar() {

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
            h-20
            px-8
            flex
            justify-between
            items-center
            border-b
            shadow-sm
            "
        >

            <div>

                <h1
                    className="
                    text-2xl
                    font-bold
                    text-slate-800
                    "
                >

                    Sistem Informasi Kepegawaian

                </h1>

                <p
                    className="
                    text-sm
                    text-gray-500
                    "
                >

                    Dashboard Operator

                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="text-right">

                    <p
                        className="
                        font-bold
                        text-slate-700
                        "
                    >

                        {user?.nama}

                    </p>

                    <span
                        className="
                        inline-block
                        mt-1
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-xs
                        font-semibold
                        "
                    >

                        Operator

                    </span>

                </div>

                <button
                    onClick={handleLogout}
                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    shadow
                    transition
                    "
                >

                    Logout

                </button>

            </div>

        </header>

    );

}