"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import ActionButtons from "@/components/ui/ActionButtons";
import PageHeader from "@/components/ui/PageHeader";

import {
  getPendidikan,
  deletePendidikan,
} from "@/services/pendidikan.service";

type Pendidikan = {
  id: number;
  nama: string;
};

export default function PendidikanPage() {
  const [pendidikan, setPendidikan] =
    useState<Pendidikan[]>([]);

  useEffect(() => {
    loadPendidikan();
  }, []);

  const loadPendidikan = async () => {
    try {
      const response =
        await getPendidikan();

      setPendidikan(
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
        await deletePendidikan(id);

        alert(
          "Data berhasil dihapus"
        );

        loadPendidikan();
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
        title="Data Pendidikan"
        subtitle="Kelola seluruh data pendidikan."
        icon="🎓"
      >
        <Button href="/pendidikan/tambah">
          + Tambah Pendidikan
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
                Nama Pendidikan
              </th>

              <th className="p-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {pendidikan.map(
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
                        editHref={`/pendidikan/edit/${item.id}`}
                        onDelete={() => handleDelete(item.id)}
                    />

                  </td>
                </tr>
              )
            )}

            {pendidikan.length === 0 && (
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