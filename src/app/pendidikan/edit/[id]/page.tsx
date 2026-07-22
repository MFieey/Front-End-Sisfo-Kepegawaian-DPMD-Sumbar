"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import AdminLayout from "@/components/layouts/AdminLayout";

import {
  getPendidikanById,
  updatePendidikan,
} from "@/services/pendidikan.service";

export default function EditPendidikanPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [nama, setNama] =
    useState("");

  useEffect(() => {
    loadPendidikan();
  }, []);

  const loadPendidikan =
    async () => {
      try {
        const response =
          await getPendidikanById(id);

        setNama(
          response.data.nama
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await updatePendidikan(
          id,
          {
            nama,
          }
        );

        alert(
          "Data berhasil diubah"
        );

        router.push(
          "/pendidikan"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Gagal mengubah data"
        );
      }
    };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-5">
        Edit Pendidikan
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
            Nama Pendidikan
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