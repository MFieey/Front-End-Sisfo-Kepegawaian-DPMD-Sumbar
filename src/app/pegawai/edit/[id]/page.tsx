"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

//import Link from "next/link";
import ManagementLayout from "@/components/layouts/ManagementLayout";

import {
  getPegawaiById,
  updatePegawai,
} from "@/services/pegawai.service";

import {
  getBidang,
} from "@/services/bidang.service";

import {
  getJabatan,
} from "@/services/jabatan.service";

import {
  getGolongan,
} from "@/services/golongan.service";

import {
  getPendidikan,
} from "@/services/pendidikan.service";

import axios from "axios";

import {
    showSuccess,
    showError,
    showLoading,
    closeLoading,
} from "@/utils/toast";

export default function EditPegawaiPage() {

    const router = useRouter();

    const params = useParams();

    const id = params.id as string;

    const [form, setForm] = useState({
        nip: "",
        nama: "",
        tempatLahir: "",
        tanggalLahir: "",
        jenisKelamin: "",
        alamat: "",
        noHp: "",
        email: "",
        tanggalMasuk: "",
        bidangId: "",
        jabatanId: "",
        golonganId: "",
        pendidikanId: "",
    });

    type MasterData = {
        id: number;
        nama: string;
    };

  const [bidang, setBidang] =
    useState<any[]>([]);

  const [jabatan, setJabatan] =
    useState<any[]>([]);

  const [golongan, setGolongan] =
    useState<any[]>([]);

  const [pendidikan, setPendidikan] =
    useState<any[]>([]);

  const loadMaster = async () => {
        try {
            const bidang = await getBidang();
            const jabatan = await getJabatan();
            const golongan = await getGolongan();
            const pendidikan = await getPendidikan();

            console.log(bidang);
            console.log(jabatan);
            console.log(golongan);
            console.log(pendidikan);

            setBidang(bidang.data);
            setJabatan(jabatan.data);
            setGolongan(golongan.data);
            setPendidikan(pendidikan.data);
        } catch (error) {
            console.log(error);
        }
    };

  const loadPegawai = async () => {

        try {

            const result = await getPegawaiById(id);

            const data = result.data;

            setForm({

                nip: data.nip || "",
                nama: data.nama || "",
                tempatLahir: data.tempatLahir || "",
                tanggalLahir: data.tanggalLahir
                    ? data.tanggalLahir.split("T")[0]
                    : "",
                jenisKelamin: data.jenisKelamin || "",
                alamat: data.alamat || "",
                noHp: data.noHp || "",
                email: data.email || "",
                tanggalMasuk: data.tanggalMasuk
                    ? data.tanggalMasuk.split("T")[0]
                    : "",
                bidangId: String(data.bidangId),
                jabatanId: String(data.jabatanId),
                golonganId: String(data.golonganId),
                pendidikanId: String(data.pendidikanId),

            });

            if (data.foto) {

                setPreviewFoto(

                    `${process.env.NEXT_PUBLIC_API_URL}/uploads/foto/${data.foto}`

                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadMaster();

        loadPegawai();

    }, []);

  const [foto, setFoto] =
  useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
    >
    ) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            if (foto) {
                formData.append("foto", foto);
            }

            showLoading("Memperbarui data pegawai...");

            await updatePegawai(id, formData);

            closeLoading();

            showSuccess(
                "Data pegawai berhasil diperbarui."
            );

            setTimeout(() => {

                router.push("/pegawai");

            }, 700);

        } catch (error) {

            closeLoading();

            if (axios.isAxiosError(error)) {

                showError(
                    error.response?.data?.message ||
                    "Gagal memperbarui data pegawai."
                );

            } else {

                showError("Terjadi kesalahan.");

            }

            console.log(error);

        }

    };

        const inputClass = `
            w-full
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            px-4
            py-3
            text-gray-700
            transition
            focus:bg-white
            focus:border-green-500
            focus:ring-2
            focus:ring-green-500
            `;

        const [previewFoto, setPreviewFoto] = useState<string | null>(null);
        const handleFotoChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {

            const file = e.target.files?.[0];

            if (!file) return;

            setFoto(file);

            setPreviewFoto(URL.createObjectURL(file));

        };

  return (
    <ManagementLayout>
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg mb-8">
            <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-5xl">

                    ✏️

                </div>

                <div>

                    <h1 className="text-3xl font-bold">

                        Edit Pegawai

                    </h1>

                    <p className="text-green-100 mt-2">

                        Perbarui informasi pegawai yang telah terdaftar.

                    </p>

                </div>

            </div>

        </div>
        
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        >
            {/* ======================== Informasi Pribadi ======================== */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <div className="flex items-center gap-4 mb-8">

                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl">

                        ✏️

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            Edit Pegawai

                        </h2>

                        <p className="text-gray-500">

                            Perbarui informasi pegawai yang telah terdaftar.

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    {/* NIP */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            NIP

                        </label>

                        <input
                            type="text"
                            name="nip"
                            value={form.nip}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Nama */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Nama Pegawai

                        </label>

                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Tempat Lahir */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Tempat Lahir

                        </label>

                        <input
                            type="text"
                            name="tempatLahir"
                            value={form.tempatLahir}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Tanggal Lahir */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Tanggal Lahir

                        </label>

                        <input
                            type="date"
                            name="tanggalLahir"
                            value={form.tanggalLahir}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Jenis Kelamin */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Jenis Kelamin

                        </label>

                        <select
                            name="jenisKelamin"
                            value={form.jenisKelamin}
                            onChange={handleChange}
                            className={inputClass}
                        >

                            <option value="">

                                Pilih Jenis Kelamin

                            </option>

                            <option value="Laki-laki">

                                Laki-laki

                            </option>

                            <option value="Perempuan">

                                Perempuan

                            </option>

                        </select>

                    </div>

                    {/* No HP */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Nomor HP

                        </label>

                        <input
                            type="text"
                            name="noHp"
                            value={form.noHp}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Email */}

                    <div className="col-span-2">

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Alamat */}

                    <div className="col-span-2">

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Alamat

                        </label>

                        <textarea
                            rows={4}
                            name="alamat"
                            value={form.alamat}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    alamat: e.target.value,
                                })
                            }
                            className={`
                                ${inputClass}
                                resize-none
                            `}
                        />

                    </div>

                </div>

            </div>


            {/* ======================== Informasi Kepegawaian ======================== */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <div className="flex items-center gap-4 mb-8">

                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-3xl">

                        💼

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            Informasi Kepegawaian

                        </h2>

                        <p className="text-gray-500">

                            Data jabatan, unit kerja, dan pendidikan pegawai.

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    {/* Tanggal Masuk */}

                    <div className="col-span-2">

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Tanggal Masuk

                        </label>

                        <input
                            type="date"
                            name="tanggalMasuk"
                            value={form.tanggalMasuk}
                            onChange={handleChange}
                            className={inputClass}
                        />

                    </div>

                    {/* Bidang */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Bidang

                        </label>

                        <select
                            name="bidangId"
                            value={form.bidangId}
                            onChange={handleChange}
                            className={inputClass}
                        >

                            <option value="">
                                Pilih Bidang
                            </option>

                            {bidang.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.nama}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Jabatan */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Jabatan

                        </label>

                        <select
                            name="jabatanId"
                            value={form.jabatanId}
                            onChange={handleChange}
                            className={inputClass}
                        >

                            <option value="">
                                Pilih Jabatan
                            </option>

                            {jabatan.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.nama}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Golongan */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Golongan

                        </label>

                        <select
                            name="golonganId"
                            value={form.golonganId}
                            onChange={handleChange}
                            className={inputClass}
                        >

                            <option value="">
                                Pilih Golongan
                            </option>

                            {golongan.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.nama}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Pendidikan */}

                    <div>

                        <label className="block mb-2 text-sm font-semibold text-gray-700">

                            Pendidikan

                        </label>

                        <select
                            name="pendidikanId"
                            value={form.pendidikanId}
                            onChange={handleChange}
                            className={inputClass}
                        >

                            <option value="">
                                Pilih Pendidikan
                            </option>

                            {pendidikan.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.nama}

                                </option>

                            ))}

                        </select>

                    </div>

                </div>

            </div>


            {/* ======================== Foto Pegawai ======================== */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">

                <div className="flex items-center gap-4 mb-8">

                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl">

                        🖼️

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            Foto Pegawai

                        </h2>

                        <p className="text-gray-500">

                            Upload foto profil pegawai.

                        </p>

                    </div>

                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-green-500 transition">

                    {previewFoto ? (

                        <div className="flex flex-col items-center">

                            <img
                                src={previewFoto}
                                alt="Preview"
                                className="w-40 h-40 rounded-xl object-cover shadow mb-5"
                            />

                            <label
                                htmlFor="foto"
                                className="
                                    cursor-pointer
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    px-5
                                    py-2.5
                                    rounded-xl
                                    transition
                                "
                            >

                                📷 Ganti Foto

                            </label>

                        </div>

                    ) : (

                        <div className="flex flex-col items-center">

                            <div className="text-7xl mb-4">

                                📷

                            </div>

                            <h3 className="text-lg font-semibold">

                                Upload Foto Pegawai

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Format JPG, JPEG atau PNG

                            </p>

                            <p className="text-gray-400 text-sm">

                                Maksimal 2 MB

                            </p>

                            <label
                                htmlFor="foto"
                                className="
                                    mt-6
                                    cursor-pointer
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    transition
                                "
                            >

                                📂 Pilih Foto

                            </label>

                        </div>

                    )}

                    <input
                        id="foto"
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="hidden"
                    />

                </div>

            </div>

            <div className="mt-5">
                <button
                    type="submit"
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-5
                        py-2
                        rounded
                        transition
                        "
                >
                    Simpan Perubahan
                </button>
            </div>
            
        </form>
        
    </ManagementLayout>
  );
}