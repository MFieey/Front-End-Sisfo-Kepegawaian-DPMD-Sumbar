"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

import ManagementLayout from "@/components/layouts/ManagementLayout";

import {
    getPegawaiById,
} from "@/services/pegawai.service";

import {
    getDokumenPegawai,
} from "@/services/dokumen.service";

import {
    uploadDokumen,
    updateDokumen,
} from "@/services/dokumen.service";

import {
    getBerkalaByPegawai,
} from "@/services/berkala.service";

import {
    getPangkatByPegawai,
} from "@/services/kenaikanPangkat.service";



export default function DetailPegawaiPage() {

    const params = useParams();

    const id = params.id as string;

    const [pegawai, setPegawai] = useState<any>(null);

    const [dokumen, setDokumen] = useState<any[]>([]);

    const [riwayatBerkala, setRiwayatBerkala] =
        useState([]);

    const [riwayatPangkat, setRiwayatPangkat] =
        useState([]);

    function InfoItem({
        label,
        value,
    }: {
        label: string;
        value: ReactNode;
    }) {
        return (
            <div className="bg-gray-50 rounded-xl border border-gray-100 hover:border-green-400 hover:shadow-md transition-all duration-300 p-5">

                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {label}
                </p>

                <p className="text-lg font-semibold text-gray-800 break-words">
                    {value || "-"}
                </p>

            </div>
        );
    }

    type DocumentCardProps = {
        title: string;
        jenis: string;
        dokumen?: any;
    };
    function DocumentCard({
        title,
        jenis,
        dokumen,
    }: DocumentCardProps) {

        const uploaded = !!dokumen;
        const inputRef =
        useRef<HTMLInputElement>(null);
        const replaceInputRef = useRef<HTMLInputElement>(null);

        const handleView = () => {

            if (!dokumen) return;

            window.open(
                `${process.env.NEXT_PUBLIC_API_URL}/uploads/dokumen/${dokumen.pathFile}`,
                "_blank"
            );

        };

        const handleDownload = () => {

            window.open(
                `${process.env.NEXT_PUBLIC_API_URL}/api/dokumen/${dokumen.id}/download`,
                "_self"
            );

        };

        const handleUpload = async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {

            try {

                const file = e.target.files?.[0];

                if (!file) return;

                const formData = new FormData();

                formData.append(
                    "pegawaiId",
                    pegawai.id.toString()
                );

                formData.append(
                    "jenisDokumen",
                    jenis
                );

                formData.append(
                    "file",
                    file
                );

                await uploadDokumen(formData);

                await loadDokumen();

                alert("Dokumen berhasil diupload");

            } catch (error: any) {

                alert(
                    error.response?.data?.message ??
                    "Upload gagal"
                );

            }

        };

        const handleReplace = async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {

            try {

                const file = e.target.files?.[0];

                if (!file) return;

                const formData = new FormData();

                formData.append("file", file);

                await updateDokumen(
                    dokumen.id,
                    formData
                );

                await loadDokumen();

                alert("Dokumen berhasil diganti.");

            } catch (error: any) {

                alert(
                    error.response?.data?.message ??
                    "Gagal mengganti dokumen."
                );

            }

        };

        return (

            <div className="border border-gray-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-md transition-all">

                <div className="flex justify-between items-center mb-4">

                    <h3 className="font-bold text-lg">

                        📄 {title}

                    </h3>

                    {uploaded ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                            ✅ Tersedia

                        </span>
                    ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                            ❌ Belum Ada

                        </span>
                    )}

                </div>

                {

                    uploaded ?

                    <div className="space-y-3">

                        <p className="text-sm text-gray-500">

                            Nama File

                        </p>

                        <p className="font-medium text-gray-800">

                            {dokumen?.namaFile}

                        </p>

                        <div className="flex gap-2 flex-wrap">

                            <button
                                onClick={handleView}
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                            >
                                👁 Lihat
                            </button>

                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                            >
                                ⬇ Download
                            </button>

                            <button
                                onClick={() => replaceInputRef.current?.click()}
                                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                            >
                                ✏ Ganti
                            </button>

                        </div>

                    </div>

                    :

                    <button

                        onClick={() =>
                            inputRef.current?.click()
                        }

                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"

                    >

                        📤 Upload Dokumen

                    </button>

                }

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    onChange={handleUpload}
                />

                <input
                    ref={replaceInputRef}
                    type="file"
                    hidden
                    onChange={handleReplace}
                />

            </div>

        );

    }

    const loadPegawai = async () => {

        try {

            const result =
                await getPegawaiById(id);

            setPegawai(result.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadDokumen = async () => {

        try {

            const result =
                await getDokumenPegawai(id);

            setDokumen(result.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadRiwayatBerkala = async () => {

        const response =
            await getBerkalaByPegawai(
                Number(id)
            );

        setRiwayatBerkala(
            response.data.data
        );

    };

    const loadRiwayatPangkat = async () => {

        const response =
            await getPangkatByPegawai(
                Number(id)
            );

        setRiwayatPangkat(
            response.data.data
        );

    };

    useEffect(() => {

        loadPegawai();

        loadDokumen();

        loadRiwayatBerkala();

        loadRiwayatPangkat();

    }, []);

    if (!pegawai) {

        return (

            <ManagementLayout>

                Loading...

            </ManagementLayout>

        );

    }

    const daftarDokumen = [

        {
            key: "SK_CPNS",
            label: "SK CPNS",
        },

        {
            key: "SK_PNS",
            label: "SK PNS",
        },

        {
            key: "SK_PANGKAT",
            label: "SK Pangkat",
        },

        {
            key: "SK_JABATAN",
            label: "SK Jabatan",
        },

        {
            key: "IJAZAH",
            label: "Ijazah",
        },

        {
            key: "SK_MUTASI",
            label: "SK Mutasi",
        },

    ];

    const getStatusBadge = (status: string) => {

        switch (status) {

            case "SELESAI":
                return "bg-green-100 text-green-700";

            case "PROSES":
                return "bg-yellow-100 text-yellow-700";

            case "BELUM":
                return "bg-gray-100 text-gray-700";

            case "TIDAK_NAIK":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };


    return (

        <ManagementLayout>

            {/* Hero */}

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-lg mb-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold mb-2">

                            👤 Detail Pegawai

                        </h1>

                        <p className="text-green-100 text-lg">

                            Informasi lengkap pegawai.

                        </p>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">

                <div className="flex gap-8 items-center">

                    {/* Foto */}

                    <div className="flex-shrink-0">

                        {

                            pegawai.foto ?

                            <img

                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/foto/${pegawai.foto}`}

                                alt={pegawai.nama}

                                className="w-40 h-40 rounded-2xl object-cover border"

                            />

                            :

                            <div className="w-40 h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-6xl">

                                👤

                            </div>

                        }

                    </div>

                    {/* Profil */}

                    <div className="flex-1">

                        <h2 className="text-3xl font-bold text-gray-800">

                            {pegawai.nama}

                        </h2>

                        <p className="text-gray-500 mt-1">

                            NIP : {pegawai.nip}

                        </p>

                        <div className="flex flex-wrap gap-3 mt-5">

                            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">

                                💼 {pegawai.jabatan?.nama}

                            </span>

                            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">

                                🏢 {pegawai.bidang?.nama}

                            </span>

                            <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700">

                                🎓 {pegawai.pendidikan?.nama}

                            </span>

                            <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700">

                                🏅 {pegawai.golongan?.nama}

                            </span>

                        </div>

                    </div>

                    {/* Action */}

                    <div>

                        <button

                            onClick={() => window.location.href=`/pegawai/edit/${pegawai.id}`}

                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"

                        >

                            ✏️ Edit Pegawai

                        </button>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">

                    👤 Informasi Pribadi

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InfoItem
                        label="Nama"
                        value={pegawai.nama}
                    />

                    <InfoItem
                        label="NIP"
                        value={pegawai.nip}
                    />

                    <InfoItem
                        label="Tempat Lahir"
                        value={pegawai.tempatLahir}
                    />

                    <InfoItem
                        label="Tanggal Lahir"
                        value={new Date(pegawai.tanggalLahir).toLocaleDateString("id-ID")}
                    />

                    <InfoItem
                        label="Jenis Kelamin"
                        value={pegawai.jenisKelamin}
                    />

                    <InfoItem
                        label="Nomor HP"
                        value={pegawai.noHp || "-"}
                    />

                    <InfoItem
                        label="Email"
                        value={pegawai.email || "-"}
                    />

                    <InfoItem
                        label="Alamat"
                        value={pegawai.alamat || "-"}
                    />

                </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">

                    💼 Informasi Kepegawaian

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InfoItem
                        label="Bidang"
                        value={pegawai.bidang?.nama}
                    />

                    <InfoItem
                        label="Jabatan"
                        value={pegawai.jabatan?.nama}
                    />

                    <InfoItem
                        label="Golongan"
                        value={pegawai.golongan?.nama}
                    />

                    <InfoItem
                        label="Pendidikan"
                        value={pegawai.pendidikan?.nama}
                    />

                    <InfoItem
                        label="Tanggal Masuk"
                        value={new Date(
                            pegawai.tanggalMasuk
                        ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    />

                </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">

                    📁 Dokumen Pegawai

                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {daftarDokumen.map((item) => {

                        const file = dokumen.find(
                            (d) => d.jenisDokumen === item.key
                        );

                        return (
                            <DocumentCard
                                key={item.key}
                                title={item.label}
                                jenis={item.key}
                                dokumen={file}
                            />
                        );

                    })}

                </div>
                

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <h2 className="text-2xl font-bold mb-6">

                    📅 Riwayat Kenaikan Gaji Berkala

                </h2>

                {

                    riwayatBerkala.length === 0 ?

                    (

                        <div className="text-center py-8 text-gray-500">

                            📭 Belum ada riwayat kenaikan gaji berkala.

                        </div>

                    )

                    :

                    (

                        <div className="space-y-4">

                            {riwayatBerkala.map((item: any) => (

                                <div
                                    key={item.id}
                                    className="border rounded-xl p-5 hover:border-green-500 transition"
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <p className="font-semibold">

                                                {new Date(item.tanggalBerkala)
                                                    .toLocaleDateString("id-ID")}

                                            </p>

                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(item.status)}`}
                                        >

                                            {item.status.replace("_", " ")}

                                        </span>

                                    </div>

                                    {

                                        item.catatan && (

                                            <p className="mt-3 text-sm text-gray-600">

                                                <strong>Catatan :</strong> {item.catatan}

                                            </p>

                                        )

                                    }

                                    {

                                        item.fileSK && (

                                            <a
                                                href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/berkala/${item.fileSK}`}
                                                target="_blank"
                                                className="inline-block mt-4 text-green-600 hover:underline"
                                            >

                                                📄 Lihat SK

                                            </a>

                                        )

                                    }

                                </div>

                            ))}

                        </div>

                    )

                }

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <h2 className="text-2xl font-bold mb-6">

                    🏅 Riwayat Kenaikan Pangkat

                </h2>

                {

                    riwayatPangkat.length === 0 ?

                    (

                        <div className="text-center py-8 text-gray-500">

                            📭 Belum ada riwayat kenaikan pangkat.

                        </div>

                    )

                    :

                    (

                        <div className="space-y-4">

                            {riwayatPangkat.map((item: any) => (

                                <div
                                    key={item.id}
                                    className="border rounded-xl p-5 hover:border-green-500 transition"
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <p className="font-semibold">

                                                {new Date(item.tanggalPangkat)
                                                    .toLocaleDateString("id-ID")}

                                            </p>

                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(item.status)}`}
                                        >

                                            {item.status.replace("_", " ")}

                                        </span>

                                    </div>

                                    {

                                        item.catatan && (

                                            <p className="mt-3 text-sm text-gray-600">

                                                <strong>Catatan :</strong> {item.catatan}

                                            </p>

                                        )

                                    }

                                    {

                                        item.fileSK && (

                                            <a
                                                href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/pangkat/${item.fileSK}`}
                                                target="_blank"
                                                className="inline-block mt-4 text-green-600 hover:underline"
                                            >

                                                📄 Lihat SK

                                            </a>

                                        )

                                    }

                                </div>

                            ))}

                        </div>

                    )

                }

            </div>

        </ManagementLayout>

    );

}