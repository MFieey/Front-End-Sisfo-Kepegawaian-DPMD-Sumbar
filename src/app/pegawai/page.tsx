"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import ManagementLayout
from "@/components/layouts/ManagementLayout";
import { getPegawai } from "@/services/pegawai.service";
import {
  deletePegawai,
} from "@/services/pegawai.service";
import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"
import ActionButtons from "@/components/ui/ActionButtons";
import SearchBar from "@/components/ui/SearchBar";
import Swal from "sweetalert2";

export default function PegawaiPage() {
  const [pegawai, setPegawai] =
    useState<any[]>([]);

  useEffect(() => {
    loadPegawai();
  }, []);

  const loadPegawai = async () => {
    try {
      const response =
        await getPegawai();

      setPegawai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [search,setSearch]=
    useState("");

  const filteredPegawai =
    pegawai.filter((item)=>

    item.nama
    .toLowerCase()
    .includes(search.toLowerCase())

    ||

    item.nip
    .toLowerCase()
    .includes(search.toLowerCase())

    );

  const handleDelete = async (id: number) => {

    const result = await Swal.fire({
        title: "Hapus Pegawai?",
        text: "Data pegawai yang dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#dc2626",
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {

        await deletePegawai(id);

        await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data pegawai berhasil dihapus.",
            timer: 1500,
            showConfirmButton: false,
        });

        loadPegawai();

    } catch (err: any) {

        Swal.fire({
            icon: "error",
            title: "Gagal",
            text:
                err?.response?.data?.message ||
                "Gagal menghapus data pegawai.",
        });

    }
  };

  return (
    <ManagementLayout>
      <PageHeader

          title="Data Pegawai"

          subtitle="Kelola seluruh data pegawai."

          icon="👥"

          >

          <Button
          href="/pegawai/tambah"
          >

          + Tambah Pegawai

          </Button>

        </PageHeader>
        
        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <div className="flex gap-4">

              <SearchBar

                  value={search}

                  onChange={setSearch}

                  placeholder="Cari Nama atau NIP Pegawai..."

              />

          </div>

      </div>
      <div
        className="
        bg-white
        rounded-2xl
        shadow
        overflow-hidden
        "
        >

        <table className="w-full">
        <thead>
          <tr
            className="
            bg-gradient-to-r
            from-green-700
            to-emerald-600
            text-white
            "
            >
            <th className="px-5 py-4 text-left font-semibold">No</th>
            <th className="px-5 py-4 text-left font-semibold">Foto</th>
            <th className="px-5 py-4 text-left font-semibold">NIP</th>
            <th className="px-5 py-4 text-left font-semibold">Nama</th>
            <th className="px-5 py-4 text-left font-semibold">Bidang</th>
            <th className="px-5 py-4 text-left font-semibold">Jabatan</th>
            <th className="px-5 py-4 text-left font-semibold">Golongan</th>
            <th className="px-5 py-4 text-left font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {filteredPegawai.map((item, index) => (
            <tr
              key={item.id}
              className="border-b
              hover:bg-green-50
              transition"
            >
              <td className="p-4">
                {index + 1}
              </td>

              <td className="p-4">
                {item.foto ? (
                  <img
                    src={`http://localhost:5000/uploads/foto/${item.foto}`}
                    alt={item.nama}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                    />
                ) : (
                  "-"
                )}
              </td>

              <td>
                <td className="px-6 py-4">

                    <Link
                        href={`/pegawai/${item.id}`}
                        className="
                            inline-flex
                            items-center
                            gap-2

                            text-gray-700

                            hover:text-green-600
                            hover:underline

                            transition-all
                            duration-200
                        "
                    >

                        🆔 {item.nip}

                    </Link>

                </td>
              </td>

              <td>
                <td className="px-6 py-4">

                    <Link
                        href={`/pegawai/${item.id}`}
                        className="
                            inline-flex
                            items-center
                            gap-2

                            font-semibold
                            text-gray-800

                            hover:text-green-600
                            hover:underline

                            transition-all
                            duration-200
                        "
                    >

                        👤 {item.nama}

                    </Link>

                </td>
              </td>

              <td className="p-4">
                <span
                    className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-sm
                    font-semibold
                    "
                >
                    🏢 {item.bidang?.nama}
                </span>
            </td>

              <td className="p-4">
                <span
                    className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-blue-100
                    text-blue-700
                    text-sm
                    font-semibold
                    "
                >
                    💼 {item.jabatan?.nama}
                </span>
            </td>

            <td className="p-4">
                <span
                    className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-100
                    text-yellow-700
                    text-sm
                    font-semibold
                    "
                >
                    🎖 {item.golongan?.nama}
                </span>
            </td> 


              <td className="p-4">

                <ActionButtons
                  detailHref={`/pegawai/${item.id}`}
                  editHref={`/pegawai/edit/${item.id}`}
                  onDelete={() => handleDelete(item.id)}
              />

            </td>

                
            </tr>
          ))}

        </tbody>
        
      </table>
      </div>
    </ManagementLayout>
  );
}