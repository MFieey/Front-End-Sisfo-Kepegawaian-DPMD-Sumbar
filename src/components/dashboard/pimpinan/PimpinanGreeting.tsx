"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function PimpinanGreeting(){

    const { user } =
    useAuth();

    const [time,setTime]=
    useState(new Date());

    useEffect(()=>{

        const interval=
        setInterval(()=>{

            setTime(new Date());

        },1000);

        return()=>clearInterval(interval);

    },[]);

    const hour=
    time.getHours();

    let greeting=
    "Selamat Malam 🌙";

    if(hour>=5 && hour<11){

        greeting=
        "Selamat Pagi ☀️";

    }else if(hour>=11 && hour<15){

        greeting=
        "Selamat Siang 🌤️";

    }else if(hour>=15 && hour<18){

        greeting=
        "Selamat Sore 🌅";

    }

    const tanggal=
    time.toLocaleDateString(
        "id-ID",
        {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

    return (
        <div
            className="
            bg-white
            rounded-xl
            shadow
            p-8
            mb-6
            "
        >

            <div className="flex items-center gap-6">

                <div
                    className="
                    w-24
                    h-24
                    rounded-full
                    bg-gradient-to-br
                    from-green-100
                    to-green-50
                    border-4
                    border-green-600
                    flex
                    items-center
                    justify-center
                    text-5xl
                    shadow-md
                    "
                >

                    👔

                </div>

                <div className="flex-1">

                    <h1
                        className="
                        text-4xl
                        font-bold
                        text-emerald-700
                        "
                    >

                        {greeting}, {user?.nama}

                    </h1>

                    <p
                        className="
                        mt-2
                        text-gray-500
                        "
                    >

                        📅 {tanggal}

                    </p>

                    <p
                        className="
                        mt-5
                        text-gray-700
                        leading-7
                        "
                    >

                        Dashboard Eksekutif ini menyajikan
                        ringkasan kondisi kepegawaian DPMD
                        Provinsi Sumatera Barat secara
                        menyeluruh.

                    </p>

                </div>

            </div>

        </div>
    );

}