"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PimpinanLayout from "@/components/layouts/PimpinanLayout";
import { getMonitoringBerkala } from "@/services/monitoring.service";

import {
    Clock3,
    CircleCheckBig,
    TriangleAlert,
    CircleX,
} from "lucide-react";



export default function DetailMonitoringBerkala() {

    const params = useParams();

    const pegawaiId = Number(params.pegawaiId);

    const [monitoring, setMonitoring] = useState<any>(null);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const response =
                await getMonitoringBerkala(
                    pegawaiId
                );

            setMonitoring(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!monitoring) {

        return (
            <PimpinanLayout>
                <div className="p-8">
                    Loading...
                </div>
            </PimpinanLayout>
        );

    }

    const getStatusConfig = (status: string) => {

        switch (status) {

            case "LAYAK DIPROSES":
                return {
                    icon: <CircleCheckBig size={34} />,
                    bg: "bg-green-100",
                    text: "text-green-700",
                    border: "border-green-300",
                    title: "Siap Diproses",
                    description:
                        "Seluruh dokumen telah lengkap dan pegawai telah memenuhi jadwal berkala.",
                };

            case "MENUNGGU KELENGKAPAN DOKUMEN":
                return {
                    icon: <TriangleAlert size={34} />,
                    bg: "bg-orange-100",
                    text: "text-orange-700",
                    border: "border-orange-300",
                    title: "Dokumen Belum Lengkap",
                    description:
                        "Pegawai sudah memasuki jadwal berkala, namun masih terdapat dokumen yang harus dilengkapi.",
                };

            default:
                return {
                    icon: <Clock3 size={34} />,
                    bg: "bg-yellow-100",
                    text: "text-yellow-700",
                    border: "border-yellow-300",
                    title: "Belum Waktunya",
                    description:
                        "Pegawai belum memasuki jadwal berkala berikutnya.",
                };

        }

    };

    const status = getStatusConfig(monitoring.status);

    return (

        <PimpinanLayout>

            <div className="p-8">

                <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6 text-white mb-6">

                    <h1 className="text-3xl font-bold">

                        Monitoring Berkala

                    </h1>

                    <p className="mt-2 opacity-90">

                        Monitoring kelengkapan dokumen dan kesiapan administrasi 
                        pegawai untuk proses kenaikan gaji berkala.

                    </p>

                </div>

                <div className="mt-8">

                    {/* Biodata */}

                    <div className="bg-white rounded-2xl shadow p-8">

                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-8">

                            👤 Informasi Pegawai

                        </h2>

                        <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">

                            <div className="flex justify-between">

                                <span className="font-semibold text-gray-500">

                                    Nama

                                </span>

                                <span className="font-medium">

                                    {monitoring.pegawai.nama}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="font-semibold text-gray-500">

                                    NIP

                                </span>

                                <span>

                                    {monitoring.pegawai.nip}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="font-semibold text-gray-500">

                                    Golongan

                                </span>

                                <span>

                                    {monitoring.pegawai.golongan}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="font-semibold text-gray-500">

                                    Bidang

                                </span>

                                <span>

                                    {monitoring.pegawai.bidang}

                                </span>

                            </div>

                        </div>

                        <div className="border-t mt-8 pt-6">

                            <div className="flex justify-between">

                                <span className="font-semibold text-gray-500">

                                    Jabatan

                                </span>

                                <span className="max-w-[70%] text-right">

                                    {monitoring.pegawai.jabatan}

                                </span>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h3 className="font-bold text-lg text-gray-700">

                            📅 Berkala Terakhir

                        </h3>

                        <p className="text-2xl font-bold mt-4 text-green-700">

                            {
                                monitoring.tanggalBerkalaTerakhir
                                    ? new Date(
                                        monitoring.tanggalBerkalaTerakhir
                                    ).toLocaleDateString("id-ID")
                                    : "-"
                            }

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h3 className="font-bold text-lg text-gray-700">

                            📆 Berkala Berikutnya

                        </h3>

                        <p className="text-2xl font-bold mt-4 text-blue-700">

                            {
                                monitoring.tanggalBerkalaSelanjutnya
                                    ? new Date(
                                        monitoring.tanggalBerkalaSelanjutnya
                                    ).toLocaleDateString("id-ID")
                                    : "-"
                            }

                        </p>

                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

                    {/* Status */}

                    <div className="bg-white rounded-2xl shadow p-6 min-h-[140px]">

                        <h2 className="flex items-center gap-2 text-xl font-bold mb-6">

                            📊 Status Monitoring

                        </h2>

                        <div
                            className={`
                                flex items-start gap-4
                                rounded-xl
                                border
                                p-5
                                ${status.bg}
                                ${status.border}
                            `}
                        >

                            <div className={status.text}>

                                {status.icon}

                            </div>

                            <div>

                                <h3 className={`font-bold text-lg ${status.text}`}>

                                    {status.title}

                                </h3>

                                <p className="text-gray-600 mt-1">

                                    {status.description}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Progress */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <div className="flex justify-between">

                            <h2 className="text-xl font-bold">

                                📈 Progress Dokumen

                            </h2>

                            <span className="font-bold text-blue-600">

                                {monitoring.persentase}%

                            </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-4 mt-6">

                            <div

                                className="bg-green-600 h-4 rounded-full transition-all duration-700"

                                style={{
                                    width: `${monitoring.persentase}%`,
                                }}

                            />

                        </div>

                        <div className="flex justify-between mt-5">

                            <div>

                                <p className="text-2xl font-bold text-green-600">

                                    {monitoring.ringkasan.dokumenLengkap}

                                </p>

                                <p className="text-sm text-gray-500">

                                    Dokumen Lengkap

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-2xl font-bold text-red-500">

                                    {monitoring.ringkasan.dokumenKurang}

                                </p>

                                <p className="text-sm text-gray-500">

                                    Dokumen Kurang

                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="bg-white rounded-2xl shadow p-6 mt-6">

                    <h2 className="text-xl font-bold flex items-center gap-2">

                        📋 Checklist Dokumen

                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 mt-6">

                        {monitoring.checklist.map((item: any) => (

                            <div
                                key={item.jenis}
                                className="flex items-center justify-between border rounded-xl p-4 hover:shadow-sm transition"
                            >

                                <div className="flex items-center gap-3">

                                    {

                                        item.tersedia

                                            ?

                                            <CircleCheckBig
                                                className="text-green-600"
                                                size={24}
                                            />

                                            :

                                            <CircleX
                                                className="text-red-500"
                                                size={24}
                                            />

                                    }

                                    <div>

                                        <p className="font-semibold">

                                            {item.jenis.replaceAll("_", " ")}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {

                                                item.tersedia

                                                    ?

                                                    "Dokumen tersedia"

                                                    :

                                                    "Dokumen belum tersedia"

                                            }

                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        ${item.tersedia
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }
                                    `}
                                >

                                    {

                                        item.tersedia

                                            ?

                                            "Lengkap"

                                            :

                                            "Belum"

                                    }

                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                <div className="bg-white rounded-2xl shadow p-6 mt-6">

                    <h2 className="text-xl font-bold">

                        ⚠ Alasan

                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">

                        {

                            monitoring.alasan.map((item: string, index: number) => (

                                <div
                                    key={index}
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        rounded-xl
                                        border
                                        border-yellow-300
                                        bg-yellow-50
                                        p-4
                                    "
                                >

                                    <TriangleAlert
                                        className="text-yellow-600 mt-1"
                                        size={20}
                                    />

                                    <p className="text-sm leading-relaxed text-gray-700">

                                        {
                                            item
                                                .replace("Dokumen ", "")
                                                .replaceAll("_", " ")
                                        }

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                </div>

                
            </div>

        </PimpinanLayout>

    );

}