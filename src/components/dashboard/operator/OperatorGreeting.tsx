"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function OperatorGreeting(){

    const { user } = useAuth();

    const [time,setTime]=
    useState(new Date());

    useEffect(()=>{

        const interval=
        setInterval(()=>{

            setTime(new Date());

        },1000);

        return()=>clearInterval(interval);

    },[]);

    const hour=time.getHours();

    let greeting="Selamat Malam 🌙";

    if(hour>=5&&hour<11){

        greeting="Selamat Pagi ☀️";

    }else if(hour>=11&&hour<15){

        greeting="Selamat Siang 🌤️";

    }else if(hour>=15&&hour<18){

        greeting="Selamat Sore 🌅";

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

    return(

        <div
        className="
        bg-white
        rounded-2xl
        shadow
        p-8
        "
        >

            <div className="flex gap-6">

                <div
                className="
                w-24
                h-24
                rounded-full
                bg-green-100
                border-4
                border-green-600
                flex
                items-center
                justify-center
                text-5xl
                "
                >

                    🧑‍💻

                </div>

                <div className="flex-1">

                    <div className="flex gap-3 items-center flex-wrap">

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

                            🟢 Login Aktif

                        </span>

                    </div>

                    <div
                    className="
                    mt-3
                    flex
                    gap-5
                    text-gray-500
                    text-sm
                    flex-wrap
                    "
                    >

                        <span>

                            📅 {tanggal}

                        </span>

                        <span>

                            🕒 {
                                time.toLocaleTimeString("id-ID")
                            }

                        </span>

                    </div>

                    <p className="mt-5 text-gray-600">

                        Dashboard Operator digunakan untuk mengelola data pegawai, memonitor masa berkala, serta kenaikan pangkat pegawai secara efektif.

                    </p>

                </div>

            </div>

        </div>

    );

}