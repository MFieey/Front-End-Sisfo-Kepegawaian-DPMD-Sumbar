"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ManagementLayout from "@/components/layouts/ManagementLayout";

import {
  getKenaikanPangkat,
  deleteKenaikanPangkat,
} from "@/services/kenaikanPangkat.service";

import Button from "@/components/ui/Button";
import ActionButtons from "@/components/ui/ActionButtons";
import PageHeader from "@/components/ui/PageHeader";
import MonitoringSummary
from "@/components/monitoring/MonitoringSummary";
import MonitoringFilter
from "@/components/monitoring/MonitoringFilter";
import MonitoringTable
from "@/components/monitoring/MonitoringTable";

import Swal from "sweetalert2";
import {
    showSuccess,
    showError
} from "@/utils/toast";

type Pangkat = {
  id: number;
  tanggalPangkat: string;
  status: string;
  catatan: string | null;
  fileSK: string | null;
  pegawai: {
    id: number;
    nama: string;
    nip: string;
  };
};

export default function KenaikanPangkatPage() {
  const [pangkat, setKenaikanPangkat] =
    useState<Pangkat[]>([]);

  useEffect(() => {
    loadKenaikanPangkat();
  }, []);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("SEMUA");

  const loadKenaikanPangkat =
    async () => {
      try {
        const response =
          await getKenaikanPangkat();

        setKenaikanPangkat(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const totalMonitoring =
    pangkat.length;

  const totalSelesai =
    pangkat.filter(
        (item) => item.status === "SELESAI"
    ).length;

  const totalProses =
      pangkat.filter(
          (item) => item.status === "PROSES"
      ).length;

  const totalBelum =
      pangkat.filter(
          (item) => item.status === "BELUM"
      ).length;

  const totalTidakNaik =
    pangkat.filter(
        (item) => item.status === "TIDAK_NAIK"
    ).length;

  const progress =
    pangkat.length > 0
        ? (totalSelesai / pangkat.length) * 100
        : 0;

  const pangkatSelesai =
    pangkat.filter(
    (item)=>item.status==="SELESAI"
  );

    const pangkatProses =
    pangkat.filter(
    (item)=>item.status==="PROSES"
  );

    const pangkatBelum =
    pangkat.filter(
    (item)=>item.status==="BELUM"
  );

  const pangkatTidakNaik =
    pangkat.filter(
        (item) => item.status === "TIDAK_NAIK"
    );

    const filteredPangkat =
    pangkat.filter((item) => {

        const cocokNama =
            item.pegawai.nama
                .toLowerCase()
                .includes(search.toLowerCase());

        const cocokNip =
            item.pegawai.nip
                .includes(search);

        const cocokStatus =
            statusFilter === "SEMUA"

                ? true

                : item.status === statusFilter;

        return (

            (cocokNama || cocokNip)

            &&

            cocokStatus

        );

    });

  const handleDelete = async (id: number) => {

    const result = await Swal.fire({

        title: "Hapus Data?",

        text: "Data yang dihapus tidak dapat dikembalikan.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#16a34a",

        cancelButtonColor: "#dc2626",

        confirmButtonText: "Ya, Hapus",

        cancelButtonText: "Batal",

        reverseButtons: true,

    });

    if (!result.isConfirmed) return;

    try {

        await deleteKenaikanPangkat(id);

        showSuccess(
            "Data pangkat berhasil dihapus."
        );

        loadKenaikanPangkat();

    } catch (error) {

        console.log(error);

        showError(
            "Gagal menghapus data pangkat."
        );

    }

  };

  return (
    <ManagementLayout>
      <PageHeader
          title="Monitoring Kenaikan Pangkat"
          subtitle=" Memantau proses administrasi kenaikan pangkat pegawai."
          icon="📅"
      >
        <Button href="/kenaikan-pangkat/tambah">
          + Tambah Pangkat
        </Button>
      </PageHeader>

      <div
        className="
        mt-6
        mb-6
        rounded-2xl
        border
        border-blue-200
        bg-blue-50
        p-6
        "
      >

        <h3 className="text-lg font-bold text-blue-700">

            ℹ️ Informasi Monitoring

        </h3>

        <div className="mt-4 space-y-4">

            <div>

                <h4 className="font-semibold text-gray-800">

                    Objek Monitoring

                </h4>

                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">

                    <li>

                        Pegawai yang sedang diproses kenaikan pangkat.

                    </li>

                    <li>

                        Pegawai yang telah selesai kenaikan pangkat.

                    </li>

                </ul>

            </div>

            <div>

                <h4 className="font-semibold text-gray-800">

                    Tujuan Monitoring

                </h4>

                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">

                    <li>

                        Memastikan proses kenaikan pangkat berjalan tepat waktu.

                    </li>

                    <li>

                        Memantau kelengkapan administrasi.

                    </li>

                    <li>

                        Membantu pengambilan keputusan pimpinan.

                    </li>

                </ul>

            </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <MonitoringSummary
        
          total={pangkat.length}
        
          selesai={totalSelesai}
        
          proses={totalProses}
        
          belum={totalBelum}
        
          progress={progress}
        
          tidakNaik={totalTidakNaik}
        
        />

      <div className="grid grid-cols-6 gap-5 my-6">

        <div className="bg-green-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                📅 Total Monitoring

            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-2">

                {pangkat.length}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-green-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                🟡 Belum

            </p>

            <h2 className="text-4xl font-bold text-yellow-600 mt-2">

                {totalBelum}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-blue-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                🔵 Proses

            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">

                {totalProses}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-emerald-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                🟢 Selesai

            </p>

            <h2 className="text-4xl font-bold text-emerald-600 mt-2">

                {totalSelesai}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-emerald-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                🔴 Tidak Naik

            </p>

            <h2 className="text-4xl font-bold text-emerald-600 mt-2">

                {totalTidakNaik}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-blue-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                📈 Progress

            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">

                {

                    totalMonitoring === 0

                    ?

                    0

                    :

                    Math.round(

                        (totalSelesai /

                        pangkat.length) *

                        100

                    )

                }%

            </h2>

            <p className="text-gray-600">

                Penyelesaian

            </p>

        </div>

      </div>

  </div>
      
      <div className="mb-6 mt-8">

        <div className="border-t border-gray-200 pt-6">

            <h2 className="text-2xl font-bold text-gray-800">

                📋 Riwayat Monitoring Pangkat

            </h2>

            <p className="text-gray-500 mt-2">

                Kelola seluruh data monitoring kenaikan pangkat pegawai.

            </p>

        </div>

      </div>
        <MonitoringFilter

          search={search}

          setSearch={setSearch}

          statusFilter={statusFilter}

          setStatusFilter={setStatusFilter}

        >

        </MonitoringFilter>
      
      <div
        className="
        bg-white
        rounded-2xl
        shadow
        overflow-hidden
        ">
        <table className="w-full">
          <thead>
            <tr
              className="
              bg-gradient-to-r
              from-green-700
              to-emerald-600
              text-white
              ">
              <th className="p-3 text-left">
                No
              </th>

              <th className="p-3 text-left">
                Nama Pegawai
              </th>

              <th className="p-3 text-left">
                NIP
              </th>

              <th className="p-3 text-left">
                Tanggal Pangkat
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Catatan
              </th>

              <th className="p-3 text-left">
                File SK
              </th>

              <th className="p-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPangkat.map(
              (item, index) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {index + 1}
                  </td>

                  <td className="p-3">
                    {item.pegawai.nama}
                  </td>

                  <td className="p-3">
                    {item.pegawai.nip}
                  </td>

                  <td className="p-3">
                    {new Date(
                      item.tanggalPangkat
                    ).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>

                 <td className="p-3">

                    <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold

                          ${
                              item.status === "SELESAI"
                                  ? "bg-green-100 text-green-700"
                              : item.status === "PROSES"
                                  ? "bg-blue-100 text-blue-700"
                              : item.status === "TIDAK_NAIK"
                                  ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                    >

                        {
                          item.status === "SELESAI"
                              ? "🟢 Selesai"
                          : item.status === "PROSES"
                              ? "🔵 Proses"
                          : item.status === "TIDAK_NAIK"
                              ? "🔴 Tidak Naik"
                          : "🟡 Belum"
                        }

                  </span>

                </td>

                <td className="p-3">

                  {item.catatan || "-"}

                </td>

                  <td className="p-3">
                    {item.fileSK ? (
                      <a
                        href={`http://localhost:5000/uploads/kenaikan-pangkat/${item.fileSK}`}
                        target="_blank"
                        className="
                          text-blue-600
                          underline
                        "
                      >
                        Lihat PDF
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                      <ActionButtons
                          detailHref={`/monitoring/pangkat/${item.pegawai.id}`}
                          editHref={`/kenaikan-pangkat/edit/${item.id}`}
                          onDelete={() => handleDelete(item.id)}
                      />

                  </td>
                </tr>
              )
            )}

            {filteredPangkat.length===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="
                    p-5
                    text-center
                    text-gray-500
                  "
                >
                  <div className="py-10 text-center">

                    <div className="text-5xl">

                        📂

                    </div>

                    <p className="mt-4 text-gray-500">

                        Tidak ada data monitoring.

                    </p>

                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ManagementLayout>
  );
}