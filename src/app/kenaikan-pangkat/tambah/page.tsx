"use client";

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import ManagementLayout from "@/components/layouts/ManagementLayout";

import { getPegawai } from "@/services/pegawai.service";

import {
  createKenaikanPangkat,
} from "@/services/kenaikanPangkat.service";

import {

    showSuccess,
    showError,
    showLoading,
    closeLoading

} from "@/utils/toast";

type Pegawai = {
  id: number;
  nama: string;
  nip: string;
};

export default function TambahPangkatPage() {
  const router = useRouter();

  const [pegawai, setPegawai] =
    useState<Pegawai[]>([]);

  const [file, setFile] =
    useState<File | null>(null);

  const [form, setForm] =
    useState({
        pegawaiId: "",
        tanggalPangkat: "",
        status: "",
        catatan: "",
    });

  useEffect(() => {
    loadPegawai();
  }, []);

  const loadPegawai =
    async () => {
      try {
        const response =
          await getPegawai();

        setPegawai(
          response.data
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
        const formData =
          new FormData();

        formData.append(
          "pegawaiId",
          form.pegawaiId
        );

        formData.append(
          "tanggalPangkat",
          form.tanggalPangkat
        );

        formData.append(
          "status",
          form.status
        );

        formData.append(
            "catatan",
            form.catatan
        );

        if (file) {
          formData.append(
            "fileSK",
            file
          );
        }

        const loading = showLoading(
            "Menyimpan data pangkat..."
        );

        await createKenaikanPangkat(formData);

        closeLoading();

        showSuccess(
            "Data pangkat berhasil ditambahkan."
        );

        setTimeout(() => {

            router.push("/kenaikan-pangkat");

        }, 700);


      } catch (error) {

            closeLoading();

            if (axios.isAxiosError(error)) {

                showError(
                    error.response?.data?.message ||
                    "Gagal menambahkan data."
                );

            } else {

                showError("Terjadi kesalahan.");

            }

        }
    };

  const inputClass =
    "w-full border rounded p-2";

    const disableSubmit =

        (form.status === "SELESAI" && !file)

        ||

        (

            form.status === "TIDAK_NAIK"

            &&

            !form.catatan.trim()

        );

  return (
    <ManagementLayout>
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">

          <h1 className="text-3xl font-bold">
              Tambah Kenaikan Pangkat
          </h1>

          <p className="mt-2 opacity-90">
              Kelola data proses kenaikan pangkat beserta dokumen 
              Surat Keputusan Kenaikan Pangkat.
          </p>

      </div>

      <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
      >
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
              👤 Data Pegawai
          </h2>

          <div>

              <label className="block mb-2 font-medium">

                  Pegawai

                  <span className="text-red-500">*</span>

              </label>

              <select
                  value={form.pegawaiId}
                  onChange={(e) =>
                      setForm({
                          ...form,
                          pegawaiId: e.target.value,
                      })
                  }
                  className={inputClass}
              >

                  <option value="">

                      Pilih Pegawai

                  </option>

                  {

                      pegawai.map((item) => (

                          <option
                              key={item.id}
                              value={item.id}
                          >

                              {item.nama} - {item.nip}

                          </option>

                      ))

                  }

              </select>

        </div>

      </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold flex items-center gap-2 mb-5">

              📅 Informasi Pangkat

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

              <div>

                  <label className="block mb-2 font-medium">

                      Tanggal Pangkat

                  </label>

                  <input
                      type="date"
                      value={form.tanggalPangkat}
                      onChange={(e) =>
                          setForm({
                              ...form,
                              tanggalPangkat:
                                  e.target.value,
                          })
                      }
                      className={inputClass}
                  />

              </div>

              <div>

                  <label className="block mb-2 font-medium">

                      Status

                  </label>

                  <select
                      value={form.status}
                      onChange={(e) =>
                          setForm({
                              ...form,
                              status:
                                  e.target.value,
                          })
                      }
                      className={inputClass}
                  >

                      <option value="">
                          Pilih Status
                      </option>

                      <option value="BELUM">
                          Belum
                      </option>

                      <option value="PROSES">
                          Proses
                      </option>

                      <option value="SELESAI">
                          Selesai
                      </option>

                      <option value="TIDAK_NAIK">
                          Tidak Naik
                      </option>

                  </select>

              </div>

              {form.status === "TIDAK_NAIK" && (

                    <div className="md:col-span-2">

                        <label className="block mb-2 font-medium">

                            Alasan Tidak Naik

                            <span className="text-red-500">*</span>

                        </label>

                        <textarea
                            rows={4}
                            value={form.catatan}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    catatan: e.target.value,
                                })
                            }
                            className={inputClass}
                            placeholder="Masukkan alasan tidak naik pangkat..."
                        />

                    </div>

                )}

          </div>

      </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold flex items-center gap-2 mb-5">

              📄 Upload Dokumen

          </h2>

          <label className="block mb-3 font-medium">

                Surat Keputusan Kenaikan Pangkat (PDF)

                {

                    form.status === "SELESAI" && (

                        <span className="text-red-500"> *</span>

                    )

                }

            </label>

          <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                  setFile(
                      e.target.files?.[0] || null
                  )
              }
              className={inputClass}
            />

            <p className="text-sm text-gray-500 mt-2">

                {

                    form.status === "SELESAI"

                    ?

                    "File SK wajib diupload karena status telah selesai."

                    :

                    "Upload file bersifat opsional."

                }

            </p>

          {

              file && (

                  <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">

                      <p className="text-green-700">

                          ✅ {file.name}

                      </p>

                  </div>

              )

          }

      </div>

        <div className="flex justify-end gap-3">

          <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 rounded-lg border"
          >

              Batal

          </button>

          <button
                type="submit"
                disabled={disableSubmit}
                className={`
                    px-6
                    py-2
                    rounded-lg
                    shadow
                    text-white
                    transition

                    ${
                        disableSubmit
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }
                `}
            >
                💾 Simpan Pangkat
            </button>

      </div>
      </form>
    </ManagementLayout>
  );
}