"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import ManagementLayout from "@/components/layouts/ManagementLayout";

import { getPegawai } from "@/services/pegawai.service";

import { useParams } from "next/navigation";

import {
    getBerkalaById,
    updateBerkala,
} from "@/services/berkala.service";

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

export default function TambahBerkalaPage() {
  const router = useRouter();
  const { id } = useParams();

  const [pegawai, setPegawai] =
    useState<Pegawai[]>([]);

  const [file, setFile] =
    useState<File | null>(null);

  const [oldFile, setOldFile] =
    useState("");

  const [form, setForm] =
    useState({
      pegawaiId: "",
      tanggalBerkala: "",
      status: "",
      catatan: "",
      
    });

  useEffect(() => {

      loadPegawai();

      loadBerkala();

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

  const loadBerkala = async () => {

    try {

        const response = await getBerkalaById(
            Number(id)
        );

        const data = response.data;

        setForm({

            pegawaiId:
                data.pegawaiId.toString(),

            tanggalBerkala:
                data.tanggalBerkala.split("T")[0],

            status:
                data.status,
            
            catatan:
                data.catatan || "",

        });

        setOldFile(
            data.fileSK
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
          "tanggalBerkala",
          form.tanggalBerkala
        );

        formData.append(
          "status",
          form.status
        );

        if (file) {
          formData.append(
            "fileSK",
            file
          );
        }

        const loading = showLoading(
            "Memperbarui data berkala..."
        );

        await updateBerkala(
            Number(id),
            formData
        );

        closeLoading();

        showSuccess(
            "Data berkala berhasil diperbarui."
        );

        setTimeout(() => {

            router.push("/berkala");

        }, 700);

      } catch (error) {
        console.log(error);

        closeLoading();

        showError(
            "Gagal memperbarui data."
        );
      }
    };

  const inputClass =
    "w-full border rounded p-2";

  return (
    <ManagementLayout>
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">

          <h1 className="text-3xl font-bold">
              Edit Kenaikan Gaji Berkala
          </h1>

          <p className="mt-2 opacity-90">
              Perbarui data kenaikan gaji berkala beserta dokumen 
              Surat Pemberitahuan Kenaikan Gaji Berkala.
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

              📅 Informasi Berkala

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

              <div>

                  <label className="block mb-2 font-medium">

                      Tanggal Berkala

                  </label>

                  <input
                      type="date"
                      value={form.tanggalBerkala}
                      onChange={(e) =>
                          setForm({
                              ...form,
                              tanggalBerkala:
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

                    <div className="mt-6">

                        <label className="block mb-2 font-medium">

                            Alasan Tidak Naik

                            <span className="text-red-500">*</span>

                        </label>

                        <textarea

                            value={form.catatan}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    catatan:e.target.value,

                                })

                            }

                            rows={4}

                            className={inputClass}

                            placeholder="Masukkan alasan pegawai tidak mendapatkan kenaikan berkala..."

                        />

                    </div>

                )}

          </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold flex items-center gap-2 mb-5">

            📄 Dokumen Saat Ini

        </h2>

        {

            oldFile ? (

                <div className="border rounded-xl p-4 bg-gray-50">

                    <p className="font-semibold">

                        📄 {oldFile.split("/").pop()}

                    </p>

                    <p className="text-gray-500 text-sm mt-1">

                        File yang saat ini tersimpan.

                    </p>

                    <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/berkala/${oldFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        👁 Lihat PDF
                    </a>

                </div>

            ) : (

                <div className="border rounded-xl p-4 bg-yellow-50 text-yellow-700">

                    Belum ada dokumen yang diupload.

                </div>

            )

        }

    </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold flex items-center gap-2 mb-5">

              📄 Upload Dokumen

          </h2>

          <label className="block mb-3 font-medium">

              Surat Pemberitahuan Kenaikan Gaji Berkala (PDF)

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
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg shadow"

          >

              💾 Update Berkala

          </button>

      </div>
      </form>
    </ManagementLayout>
  );
}