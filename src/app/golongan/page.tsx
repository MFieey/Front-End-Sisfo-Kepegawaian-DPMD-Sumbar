"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import ActionButtons from "@/components/ui/ActionButtons";
import PageHeader from "@/components/ui/PageHeader";

import {
  getGolongan,
  deleteGolongan,
} from "@/services/golongan.service";

type Golongan = {
  id: number;
  nama: string;
};

export default function GolonganPage() {
  const [golongan, setGolongan] =
    useState<Golongan[]>([]);

  useEffect(() => {
    loadGolongan();
  }, []);

  const loadGolongan = async () => {
    try {
      const response =
        await getGolongan();

      setGolongan(
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
        await deleteGolongan(id);

        alert(
          "Data berhasil dihapus"
        );

        loadGolongan();
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
        title="Data Golongan"
        subtitle="Kelola seluruh data golongan."
        icon="🎖️"
      >
        <Button href="/golongan/tambah">
          + Tambah Golongan
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
              <th className="p-3 text-left">
                No
              </th>

              <th className="p-3 text-left">
                Nama Golongan
              </th>

              <th className="p-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {golongan.map(
              (item, index) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {index + 1}
                  </td>

                  <td className="p-3">
                    {item.nama}
                  </td>

                  <td className="p-4">

                    <ActionButtons
                        editHref={`/golongan/edit/${item.id}`}
                        onDelete={() => handleDelete(item.id)}
                    />

                </td>
                </tr>
              )
            )}

            {golongan.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="
                    p-5
                    text-center
                    text-gray-500
                  "
                >
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}