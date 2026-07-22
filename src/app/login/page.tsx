"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import Image from "next/image";

export default function LoginPage() {

    const router = useRouter();

    const { refreshUser } = useAuth();

    const [loading,setLoading] =
    useState(false);

    const [form,setForm]=useState({

        username:"",
        password:""

    });

    const handleSubmit = async(
        e:React.FormEvent
    )=>{

        e.preventDefault();

        setLoading(true);

        try{

            const response =
            await login(form);

            await refreshUser();

            await Swal.fire({

                icon:"success",

                title:"Login Berhasil",

                text:"Selamat Datang",

                timer:1200,

                showConfirmButton:false

            });

            switch(response.data.role){

                case "ADMIN":

                    router.push("/dashboard/admin");

                break;

                case "OPERATOR":

                    router.push("/dashboard/operator");

                break;

                case "PIMPINAN":

                    router.push("/dashboard/pimpinan");

                break;

            }

        }catch{

            Swal.fire({

                icon:"error",

                title:"Login Gagal",

                text:"Username atau Password salah"

            });

        }finally{

            setLoading(false);

        }

    };

return (
    <div
        className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-green-950
        via-green-800
        to-emerald-600
        px-5
        "
    >

        {/* Background Blur */}

        <div className="absolute inset-0">

            <div
                className="
                absolute
                -top-40
                -left-40
                w-96
                h-96
                rounded-full
                bg-white/10
                blur-3xl
                "
            />

            <div
                className="
                absolute
                bottom-0
                right-0
                w-[500px]
                h-[500px]
                rounded-full
                bg-emerald-300/10
                blur-3xl
                "
            />

        </div>

        {/* Card Login */}

        <div
            className="
            relative
            bg-white
            rounded-3xl
            shadow-2xl
            p-10
            max-w-lg
            w-full
            "
        >

<div className="text-center mb-8">

<div className="flex justify-center">

    <Image
        src="/logo-dpmd.png"
        alt="Logo DPMD"
        width={100}
        height={100}
        priority
        className="drop-shadow-lg"
    />

</div>

<h1 className="text-4xl font-extrabold text-green-700 mt-4">
  
Sistem Informasi

</h1>

<h2 className="text-2xl font-bold text-green-700">

Manajemen Kepegawaian

</h2>

<p className="text-gray-600 mt-3 leading-relaxed">

Dinas Pemberdayaan Masyarakat dan Desa
<br />
Provinsi Sumatera Barat

</p>

</div>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<div>

<label className="font-semibold">

Username

</label>

<input

type="text"

value={form.username}

onChange={(e)=>

setForm({

...form,

username:e.target.value

})

}

className="
w-full
mt-2
rounded-xl
border
border-gray-300
p-3
outline-none
focus:border-green-600
focus:ring-4
focus:ring-green-100
transition
"

/>

</div>

<div>

<label className="font-semibold">

Password

</label>

<input

type="password"

value={form.password}

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

className="
w-full
mt-2
rounded-xl
border
border-gray-300
p-3
outline-none
focus:border-green-600
focus:ring-4
focus:ring-green-100
transition
"

/>

</div>

<button

className="
w-full
bg-gradient-to-r
from-green-700
to-green-600
hover:from-green-800
hover:to-green-700
text-white
py-3
rounded-xl
font-bold
shadow-lg
transition
duration-300
"

disabled={loading}

>

{

loading

?

"Sedang Login..."

:

"Login"

}

</button>

</form>

<p className="text-center text-sm text-gray-500 mt-8">

© 2026 DPMD Provinsi Sumatera Barat

</p>

</div>

</div>

    );

}