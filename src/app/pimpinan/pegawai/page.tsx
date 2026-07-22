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
import PimpinanLayout from "@/components/layouts/PimpinanLayout";

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

  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete =
      confirm(
        "Yakin ingin menghapus data?"
      );

    if (!confirmDelete) return;

    try {
      await deletePegawai(id);

      alert("Data berhasil dihapus");

      loadPegawai();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus data");
    }
  };

  return (
    <PimpinanLayout>
      <PageHeader

          title="Data Pegawai"

          subtitle="Kelola seluruh data pegawai."

          icon="👥"

          >

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

              <td className="p-4">
                {item.nip}
              </td>

              <td className="p-4">
                {item.nama}
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
                           
            </tr>
          ))}

        </tbody>
        
      </table>
      </div>
    </PimpinanLayout>
  );
}