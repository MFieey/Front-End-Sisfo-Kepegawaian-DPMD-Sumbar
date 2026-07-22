"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"
import ActionButtons from "@/components/ui/ActionButtons";

import {
  getBidang,
  deleteBidang,
} from "@/services/bidang.service";

type Bidang = {
  id: number;
  nama: string;
};

export default function BidangPage() {
  const [bidang, setBidang] =
    useState<Bidang[]>([]);

  useEffect(() => {
    loadBidang();
  }, []);

  const loadBidang = async () => {
    try {
      const response =
        await getBidang();

      setBidang(
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
        await deleteBidang(id);

        alert(
          "Data berhasil dihapus"
        );

        loadBidang();
      } catch (error) {
        console.log(error);

        alert(
          "Gagal menghapus data"
        );
      }
    };

  return (
    <AdminLayout>
      <PageHeader
          title="Data Bidang"
          subtitle="Kelola seluruh data bidang."
          icon="🏢"
      >

          <Button href="/bidang/tambah">
              + Tambah Bidang
          </Button>

      </PageHeader>

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
              <th
                className="
                px-6
                py-4
                text-left
                font-semibold
                "
                >
                No
              </th>

              <th className="
                  px-6
                  py-4
                  text-left
                  font-semibold
                  ">
                Nama Bidang
              </th>

              <th className="
                  px-6
                  py-4
                  text-center
                  font-semibold
                  ">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {bidang.map(
              (item, index) => (
                <tr
                    key={item.id}
                    className="
                    border-b
                    hover:bg-green-50
                    transition
                    duration-200
                    "
                >
                  <td className="
                    px-6
                    py-5
                    ">
                    {index + 1}
                  </td>

                  <td className="
                    px-6
                    py-5
                    ">
                    {item.nama}
                  </td>

                  <td className="
                    px-6
                    py-5
                    ">

                    <ActionButtons
                        editHref={`/bidang/edit/${item.id}`}
                        onDelete={() => handleDelete(item.id)}
                    />

                </td>
                </tr>
              )
            )}

            {bidang.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="
                    p-5
                    text-center
                    text-gray-500
                  "
                >
                  <div className="py-8">

                    <div className="text-5xl mb-3">

                        📂

                    </div>

                    <p className="font-semibold">

                        Belum ada data bidang

                    </p>

                    <p className="text-gray-500 mt-2">

                        Klik tombol Tambah Bidang untuk menambahkan data.

                    </p>

                </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}