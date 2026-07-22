"use client";

import { useEffect, useState } from "react";

import PimpinanLayout 
from "@/components/layouts/PimpinanLayout";

import PageHeader
from "@/components/ui/PageHeader";

import { getActivities }
from "@/services/activity.service";


export default function ActivityPage(){

    const [activities,setActivities]=
        useState<any[]>([]);

    useEffect(()=>{

        loadData();

    },[]);

    const loadData=async()=>{

        const response=
        await getActivities();

        setActivities(
            response.data
        );

    };

    const [search, setSearch] = useState("");

    const [activityFilter, setActivityFilter] =
    useState("ALL");

    const [moduleFilter, setModuleFilter] =
    useState("ALL");

    const modules = [

        "Pegawai",

        "Bidang",

        "Jabatan",

        "Golongan",

        "Pendidikan",

        "Monitoring Berkala",

        "Monitoring Pangkat",

    ];

    const filteredActivities =

        activities.filter((item)=>{

            const searchMatch =

                item.user.nama
                .toLowerCase()
                .includes(search.toLowerCase())

                ||

                item.deskripsi
                .toLowerCase()
                .includes(search.toLowerCase())

                ||

                item.modul
                .toLowerCase()
                .includes(search.toLowerCase());

            const activityMatch =

                activityFilter==="ALL"

                ||

                item.aktivitas===activityFilter;

            const moduleMatch =

                moduleFilter==="ALL"

                ||

                item.modul===moduleFilter;

            return(

                searchMatch

                &&

                activityMatch

                &&

                moduleMatch

            );

        });

    const renderModule=(module:string)=>{

        switch(module){

        case "Pegawai":

        return "👥 Pegawai";

        case "Bidang":

        return "🏢 Bidang";

        case "Jabatan":

        return "💼 Jabatan";

        case "Golongan":

        return "🎖️ Golongan";

        case "Pendidikan":

        return "🎓 Pendidikan";

        case "Monitoring Berkala":

        return "📅 Berkala";

        case "Monitoring Pangkat":

        return "📈 Pangkat";

        default:

        return module;

        }

    }

    const renderBadge=(aktivitas:string)=>{

        switch(aktivitas){

            case "CREATE":

                return(

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">

                        CREATE

                    </span>

                );

            case "UPDATE":

                return(

                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

                        UPDATE

                    </span>

                );

            case "DELETE":

                return(

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">

                        DELETE

                    </span>

                );

            case "LOGIN":

                return(

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">

                        LOGIN

                    </span>

                );

            default:

                return(

                    <span className="px-3 py-1 rounded-full bg-gray-200">

                        LOGOUT

                    </span>

                );

        }

    };

    const latest = filteredActivities[0];

    const totalLog = filteredActivities.length;

    const totalCreate = filteredActivities.filter(
        item => item.aktivitas === "CREATE"
    ).length;

    const totalUpdate = filteredActivities.filter(
        item => item.aktivitas === "UPDATE"
    ).length;

    const totalDelete = filteredActivities.filter(
        item => item.aktivitas === "DELETE"
    ).length;

    return(

        <PimpinanLayout>

            <PageHeader

                title="Audit Trail Sistem"

                subtitle="Riwayat aktivitas seluruh pengguna sistem informasi."

                icon="🛡️"

            />

            <div className="grid grid-cols-5 gap-6 mb-6">

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <p className="text-gray-500">

                        📋 Total Log

                    </p>

                    <h2 className="text-3xl font-bold text-slate-700 mt-2">

                        {totalLog}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <p className="text-green-700 font-semibold">

                        🟢 CREATE

                    </p>

                    <h2 className="text-3xl font-bold text-green-700 mt-2">

                        {totalCreate}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <p className="text-yellow-600 font-semibold">

                        🟡 UPDATE

                    </p>

                    <h2 className="text-3xl font-bold text-yellow-600 mt-2">

                        {totalUpdate}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <p className="text-red-600 font-semibold">

                        🔴 DELETE

                    </p>

                    <h2 className="text-3xl font-bold text-red-600 mt-2">

                        {totalDelete}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">

                    <p className="text-blue-600 font-semibold">

                        🕒 Aktivitas Terakhir

                    </p>

                    {

                        latest

                        ?

                        <>

                            <p className="mt-2 font-bold">

                                {latest.aktivitas}

                            </p>

                            <p className="text-sm text-gray-500">

                                {renderModule(latest.modul)}

                            </p>

                            <p className="text-xs text-gray-400 mt-1">

                                {

                                    new Date(

                                        latest.createdAt

                                    ).toLocaleString("id-ID")

                                }

                            </p>

                        </>

                        :

                        <p className="mt-2">

                            -

                        </p>

                    }

                </div>

            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">

                <input
                    value={search}
                    onChange={(e)=>
                        setSearch(e.target.value)
                    }
                    placeholder="🔍 Cari aktivitas..."
                    className="
                        border
                        rounded-xl
                        p-3
                        shadow-sm
                    "
                />

                <select

                    value={activityFilter}

                    onChange={(e)=>

                        setActivityFilter(

                            e.target.value

                        )

                    }

                    className="

                    border

                    rounded-xl

                    p-3

                    shadow-sm

                    "

                >

                    <option value="ALL">

                        Semua Aktivitas

                    </option>

                    <option>

                        CREATE

                    </option>

                    <option>

                        UPDATE

                    </option>

                    <option>

                        DELETE

                    </option>

                    <option>

                        LOGIN

                    </option>

                    <option>

                        LOGOUT

                    </option>

                </select>

                <select

                    value={moduleFilter}

                    onChange={(e)=>

                        setModuleFilter(

                            e.target.value

                        )

                    }

                    className="

                    border

                    rounded-xl

                    p-3

                    shadow-sm

                    "

                >

                    <option value="ALL">

                        Semua Modul

                    </option>

                    {

                        modules.map(modul=>(

                            <option
                                key={modul}
                            >

                                {modul}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-green-700 text-white">

                        <tr>

                            <th className="p-4 text-left">
                                Tanggal & Waktu
                            </th>

                            <th className="p-4 text-left">
                                User
                            </th>

                            <th className="p-4 text-center">
                                Aktivitas
                            </th>

                            <th className="p-4 text-center">
                                Modul
                            </th>

                            <th className="p-4 text-left">
                                Deskripsi
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        
                        {

                            filteredActivities.length===0

                            ?

                            <tr>

                                <td

                                    colSpan={5}

                                    className="

                                    text-center

                                    p-10

                                    text-gray-500

                                    "

                                >

                                    📝

                                    Belum ada aktivitas yang sesuai.

                                </td>

                            </tr>

                            :

                            filteredActivities.map((item)=>(

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-green-50"
                                >

                                    <td className="p-4">

                                        {
                                            new Date(item.createdAt)

                                            .toLocaleString(

                                            "id-ID",

                                            {

                                            day:"2-digit",

                                            month:"short",

                                            year:"numeric",

                                            hour:"2-digit",

                                            minute:"2-digit",
                                            
                                            second: "2-digit",

                                            }

                                            )

                                        }

                                    </td>

                                    <td>

                                        <div>

                                            <p className="font-medium">

                                                {item.user.nama}

                                            </p>

                                            <span
                                                className={`
                                                    text-xs
                                                    px-2
                                                    py-1
                                                    rounded-full
                                                    font-semibold

                                                    ${
                                                        item.user.role==="ADMIN"

                                                        ?

                                                        "bg-green-100 text-green-700"

                                                        :

                                                        "bg-blue-100 text-blue-700"
                                                    }
                                                `}
                                            >

                                                {item.user.role}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="p-4 text-center">

                                        {renderBadge(item.aktivitas)}

                                    </td>

                                    <td className="p-4 text-center">

                                        {renderModule(item.modul)}

                                    </td>

                                    <td className="p-4">

                                        {item.deskripsi}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </PimpinanLayout>

    );

}