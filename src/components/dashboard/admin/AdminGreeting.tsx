"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminGreeting() {

    const { user } = useAuth();

    const [time, setTime] =
        useState(new Date());

    useEffect(() => {

        const interval =
            setInterval(() => {

                setTime(new Date());

            }, 1000);

        return () => clearInterval(interval);

    }, []);

    const now = new Date();

    const hour = parseInt(
        now.toLocaleTimeString(
            "en-GB",
            {
            hour: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
            }
        )
    );

    let greeting = "Selamat Malam 🌙";

    if (hour >= 5 && hour < 11) {

        greeting = "Selamat Pagi ☀️";

    } else if (hour >= 11 && hour < 15) {

        greeting = "Selamat Siang 🌤️";

    } else if (hour >= 15 && hour < 18) {

        greeting = "Selamat Sore 🌅";

    }

    const tanggalSekarang =
        new Date().toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    const motivasi =
        hour < 11
            ? "Awali hari dengan semangat dan ketelitian. 💚"
            : hour < 15
            ? "Tetap fokus menjaga kualitas data kepegawaian. 🌿"
            : hour < 18
            ? "Pastikan seluruh data hari ini telah diperbarui. 📋"
            : "Terima kasih atas dedikasi Anda hari ini. 🌙";

    return (

        <div className="bg-white rounded-xl shadow p-8 mb-6">

            <div className="flex items-center gap-6">

                <img
                    src="/software-engineer.png"
                    alt="Avatar"
                    className="
                        w-20
                        h-20
                        rounded-full
                        border-4
                        border-green-600
                        object-cover
                    "
                />

                <div className="flex-1">

                    <div className="flex items-center gap-3 flex-wrap">

                        <h1
                            className="
                            text-3xl
                            font-bold
                            text-green-700
                            "
                        >
                            {greeting}, {user?.nama}
                        </h1>

                        <span
                            className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            "
                        >
                            🛡 Administrator
                        </span>

                    </div>

                    <div
                        className="
                        flex
                        gap-5
                        mt-2
                        text-sm
                        text-gray-500
                        flex-wrap
                        "
                    >

                        <span>

                            📅 {tanggalSekarang}

                        </span>

                        <span>

                            🕒 {

                                time.toLocaleTimeString(
                                    "id-ID",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    }
                                )

                            } WIB

                        </span>

                    </div>

                    <p className="mt-4 text-gray-600">

                        Selamat datang di Dashboard Administrator.
                        Kelola seluruh data, pengguna, serta monitoring
                        sistem kepegawaian secara menyeluruh.

                    </p>

                </div>

            </div>

            <div
                className="
                mt-6
                bg-green-50
                border-l-4
                border-green-600
                rounded-lg
                p-4
                "
            >

                <p
                    className="
                    italic
                    text-green-800
                    "
                >

                    💚 {motivasi}

                </p>

            </div>

        </div>

    );

}