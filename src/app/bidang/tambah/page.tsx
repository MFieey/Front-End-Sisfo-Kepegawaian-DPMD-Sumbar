"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layouts/AdminLayout";
import { createBidang } from "@/services/bidang.service";

export default function TambahBidangPage() {
  const router = useRouter();

  const [nama, setNama] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createBidang({
        nama,
      });

      alert(
        "Data berhasil ditambahkan"
      );

      router.push("/bidang");
    } catch (error) {
      console.log(error);

      alert(
        "Gagal menambahkan data"
      );
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-5">
        Tambah Bidang
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-5
          rounded-lg
          shadow
        "
      >
        <div className="mb-4">
          <label>
            Nama Bidang
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) =>
              setNama(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-2
              rounded
            "
          />
        </div>

        <button
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Simpan
        </button>
      </form>
    </AdminLayout>
  );
}