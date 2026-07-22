"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getBerkala,
  deleteBerkala,
} from "@/services/berkala.service";

import Button from "@/components/ui/Button";
import ActionButtons from "@/components/ui/ActionButtons";
import PageHeader from "@/components/ui/PageHeader";
import MonitoringSummary
from "@/components/monitoring/MonitoringSummary";
import MonitoringFilter
from "@/components/monitoring/MonitoringFilter";
import MonitoringTable
from "@/components/monitoring/MonitoringTable";

import PimpinanLayout from "@/components/layouts/PimpinanLayout";

type Berkala = {
  id: number;
  tanggalBerkala: string;
  status: string;
  fileSK: string | null;
  pegawai: {
    id: number;
    nama: string;
    nip: string;
  };
};

export default function BerkalaPage() {
  const [berkala, setBerkala] =
    useState<Berkala[]>([]);

  useEffect(() => {
    loadBerkala();
  }, []);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("SEMUA");

  const loadBerkala =
    async () => {
      try {
        const response =
          await getBerkala();

        setBerkala(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const totalMonitoring =
    berkala.length;

  const totalSudah =
    berkala.filter(
    (item)=>item.status==="SUDAH"
    ).length;

  const totalBelum =
    berkala.filter(
    (item)=>item.status==="BELUM"
    ).length;

  const berkalaBelum = berkala.filter(
    (item) => item.status === "BELUM"
);

const berkalaSudah = berkala.filter(
    (item) => item.status === "SUDAH"
);  

    const filteredBerkala =
    berkala.filter((item) => {

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

  const handleDelete =
    async (id: number) => {
      const confirmDelete =
        confirm(
          "Yakin ingin menghapus data?"
        );

      if (!confirmDelete) return;

      try {
        await deleteBerkala(id);

        alert(
          "Data berhasil dihapus"
        );

        loadBerkala();
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
          title="Monitoring Berkala"
          subtitle="Memantau pegawai yang telah dan belum melaksanakan kenaikan gaji berkala."
          icon="📅"
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

                        Pegawai yang telah melaksanakan kenaikan gaji berkala.

                    </li>

                    <li>

                        Pegawai yang belum melaksanakan kenaikan gaji berkala.

                    </li>

                </ul>

            </div>

            <div>

                <h4 className="font-semibold text-gray-800">

                    Tujuan Monitoring

                </h4>

                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">

                    <li>

                        Memastikan administrasi berkala diproses tepat waktu.

                    </li>

                    <li>

                        Menghindari keterlambatan penerbitan SK.

                    </li>

                    <li>

                        Membantu pimpinan memantau kondisi kepegawaian secara cepat.

                    </li>

                </ul>

            </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <MonitoringSummary

          title="Monitoring Berkala"

          total={totalMonitoring}

          sudah={totalSudah}

          belum={totalBelum}

          color="text-yellow-600"

          icon="📅"

      />

      <div className="grid grid-cols-4 gap-5 my-6">

        <div className="bg-green-50 rounded-2xl shadow p-5">

            <p className="text-gray-500">

                📅 Berkala Bulan Ini

            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-2">

                {berkala.length}

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

            title="🟡 Pegawai Belum Berkala"

            color="text-yellow-600"

            data={berkalaBelum}

            tanggalField="tanggalBerkala"

        />

        <MonitoringTable

            title="🟢 Pegawai Sudah Berkala"

            color="text-green-600"

            data={berkalaSudah}

            tanggalField="tanggalBerkala"

        />
    </div>
  </div>
      
      <div className="mb-6 mt-8">

        <div className="border-t border-gray-200 pt-6">

            <h2 className="text-2xl font-bold text-gray-800">

                📋 Riwayat Monitoring Berkala

            </h2>

            <p className="text-gray-500 mt-2">

                Kelola seluruh data monitoring kenaikan gaji berkala pegawai.

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
                Tanggal Berkala
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
            {filteredBerkala.map(
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
                      item.tanggalBerkala
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

                                    : "bg-yellow-100 text-yellow-700"
                            }
                        `}
                    >

                        {

                            item.status === "SUDAH"

                                ? "🟢 Sudah"

                                : "🟡 Belum"

                        }

                    </span>

                </td>

                  <td className="p-3">
                    {item.fileSK ? (
                      <a
                        href={`http://localhost:5000/uploads/berkala/${item.fileSK}`}
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

            {filteredBerkala.length===
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