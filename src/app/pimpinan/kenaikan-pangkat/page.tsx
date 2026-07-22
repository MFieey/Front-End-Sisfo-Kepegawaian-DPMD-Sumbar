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

import MonitoringTable
from "@/components/monitoring/MonitoringTable";

import MonitoringFilter
from "@/components/monitoring/MonitoringFilter";
import PimpinanLayout from "@/components/layouts/PimpinanLayout";

type KenaikanPangkat = {
  id: number;
  tanggalPangkat: string;
  status: string;
  fileSK: string | null;
  pegawai: {
    id: number;
    nama: string;
    nip: string;
  };
};

export default function KenaikanPangkatPage() {
  const [kenaikanpangkat, setKenaikanPangkat] =
    useState<KenaikanPangkat[]>([]);

  useEffect(() => {
    loadKenaikanPangkat();
  }, []);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("SEMUA");

  const totalMonitoring =
    kenaikanpangkat.length;

  const totalSudah =
      kenaikanpangkat.filter(

          item=>item.status==="SUDAH"

      ).length;

  const totalBelum =
      kenaikanpangkat.filter(

          item=>item.status==="BELUM"

      ).length;

  const pangkatBelum =
      kenaikanpangkat.filter(

          item=>item.status==="BELUM"

      );

  const pangkatSudah =
      kenaikanpangkat.filter(

          item=>item.status==="SUDAH"

      );

  const filteredPangkat =
    kenaikanpangkat.filter((item) => {

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

  const handleDelete =
    async (id: number) => {
      const confirmDelete =
        confirm(
          "Yakin ingin menghapus data?"
        );

      if (!confirmDelete) return;

      try {
        await deleteKenaikanPangkat(id);

        alert(
          "Data berhasil dihapus"
        );

        loadKenaikanPangkat();
      } catch (error) {
        console.log(error);

        alert(
          "Gagal menghapus data"
        );
      }
    };

  return (
    <PimpinanLayout>
      <PageHeader
        title="Monitoring Kenaikan Pangkat"
        subtitle="Memantau pegawai yang telah dan belum melaksanakan kenaikan pangkat."
        icon="📈"
      >
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

                        Pegawai yang telah melaksanakan kenaikan pangkat.

                    </li>

                    <li>

                        Pegawai yang belum melaksanakan kenaikan pangkat.

                    </li>

                </ul>

            </div>

            <div>

                <h4 className="font-semibold text-gray-800">

                    Tujuan Monitoring

                </h4>

                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">

                    <li>

                        Memastikan proses kenaikan pangkat diproses tepat waktu.

                    </li>

                    <li>

                        Menghindari keterlambatan administrasi.

                    </li>

                    <li>

                        Membantu pimpinan memantau perkembangan kenaikan pangkat pegawai.

                    </li>

                </ul>

            </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-6">

      <MonitoringSummary

        title="Monitoring Kenaikan Pangkat"

        total={totalMonitoring}

        sudah={totalSudah}

        belum={totalBelum}

        color="text-red-600"

        icon="📈"

      />

      <div className="grid grid-cols-4 gap-5 my-6">

        <div className="bg-green-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                📅 Berkala Bulan Ini

            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-2">

                {kenaikanpangkat.length}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-emerald-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                🟢 Sudah

            </p>

            <h2 className="text-4xl font-bold text-emerald-600 mt-2">

                {totalSudah}

            </h2>

            <p className="text-gray-600">

                Pegawai

            </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl shadow p-5">

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

                📈 Progress

            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">

                {

                    totalMonitoring === 0

                    ?

                    0

                    :

                    Math.round(

                        totalSudah /

                        totalMonitoring *

                        100

                    )

                }%

            </h2>

            <p className="text-gray-600">

                Penyelesaian

            </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">

        <MonitoringTable

          title="🔴 Pegawai Belum Naik Pangkat"

          data={pangkatBelum}

          tanggalField="tanggalPangkat"

          color="text-red-600"

        />

        <MonitoringTable

          title="🟢 Pegawai Sudah Naik Pangkat"

          data={pangkatSudah}

          tanggalField="tanggalPangkat"

          color="text-green-600"

        />

      </div>
    </div>

      <div className="mb-6 mt-8">

        <div className="border-t border-gray-200 pt-6">

        <h2 className="text-2xl font-bold">

        📋 Riwayat Monitoring Kenaikan Pangkat

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
                Tanggal Kenaikan Pangkat
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                File SK
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
                                item.status === "SUDAH"

                                    ? "bg-green-100 text-green-700"

                                    : "bg-red-100 text-red-700"
                            }
                        `}
                    >

                        {

                            item.status === "SUDAH"

                                ? "🟢 Sudah"

                                : "🔴 Belum"

                        }

                    </span>

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
    </PimpinanLayout>
  );
}