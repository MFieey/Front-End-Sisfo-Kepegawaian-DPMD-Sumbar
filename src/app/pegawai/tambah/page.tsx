"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import Link from "next/link";
import ManagementLayout from "@/components/layouts/ManagementLayout";

import {
  createPegawai,
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

export default function TambahPegawaiPage() {

    const router = useRouter();

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

  useEffect(() => {
    loadMaster();
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
            const formData =
            new FormData();

            Object.entries(form).forEach(
            ([key, value]) => {
                formData.append(
                key,
                String(value)
                );
            }
            );

            if (foto) {
            formData.append(
                "foto",
                foto
            );
            }

            await createPegawai(formData);

                alert(
                "Data berhasil disimpan"
                );

                router.push("/pegawai");
        } catch (error) {
            console.log(error);
            alert(
            "Gagal menyimpan data"
            );
        }
        };

  return (
    <ManagementLayout>
      <h1 className="text-3xl font-bold mb-5">
        Tambah Pegawai
      </h1>
      <form onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block mb-1 font-medium text-gray-700">NIP</label>
                <input
                    type="text"
                    name="nip"
                    value={form.nip}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
                </div>

                <div>
                <label className="block mb-1 font-medium text-gray-700">Nama</label>
                <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
                </div>

                <div>
                <label className="block mb-1 font-medium text-gray-700">Tempat Lahir</label>
                <input
                    type="text"
                    name="tempatLahir"
                    value={form.tempatLahir}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
                </div>

                <div>
                <label className="block mb-1 font-medium text-gray-700">Tanggal Lahir</label>
                <input
                    type="date"
                    name="tanggalLahir"
                    value={form.tanggalLahir}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
                </div>

                <div>
                <label className="block mb-1 font-medium text-gray-700">Jenis Kelamin</label>
                <select
                    name="jenisKelamin"
                    value={form.jenisKelamin}
                    onChange={handleChange}
                    className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            "
                >
                    <option value="">
                    Pilih
                    </option>

                    <option value="Laki-laki">
                    Laki-laki
                    </option>

                    <option value="Perempuan">
                    Perempuan
                    </option>
                </select>
                </div>

                <div>
                <label className="block mb-1 font-medium text-gray-700">No HP</label>
                <input
                    type="text"
                    name="noHp"
                    value={form.noHp}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
                </div>

                <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Tanggal Masuk</label>
                    <input
                        type="date"
                        name="tanggalMasuk"
                        value={form.tanggalMasuk}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Bidang</label>
                    <select
                        name="bidangId"
                        value={form.bidangId}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            "
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

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Jabatan</label>

                    <select
                        name="jabatanId"
                        value={form.jabatanId}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            "
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

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Golongan</label>

                    <select
                        name="golonganId"
                        value={form.golonganId}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            "
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

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Pendidikan</label>

                    <select
                        name="pendidikanId"
                        value={form.pendidikanId}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            "
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

                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">Alamat</label>

                    <textarea
                        name="alamat"
                        value={form.alamat}
                        onChange={(e) =>
                        setForm({
                            ...form,
                            alamat: e.target.value,
                        })
                        }
                        className="
                            w-full
                            border
                            border-black-300
                            px-3
                            py-2.5
                            rounded-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                        "
                    />
                </div>
            </div>
            <div>
                <label>Foto</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                    setFoto(
                        e.target.files?.[0] || null
                    )
                    }
                     className="
                        w-full
                        border
                        border-black-300
                        px-3
                        py-2.5
                        rounded-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />
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
                    Simpan
                </button>
            </div>
            
        </form>
        
    </ManagementLayout>
  );
}