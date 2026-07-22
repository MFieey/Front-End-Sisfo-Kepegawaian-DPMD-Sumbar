"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import ManagementLayout from "@/components/layouts/ManagementLayout";

import { getPegawai } from "@/services/pegawai.service";

import {
  createBerkala,
} from "@/services/berkala.service";

import { useParams } from "next/navigation";

import {
  getBerkalaById,
  updateBerkala,
} from "@/services/berkala.service";

type Pegawai = {
  id: number;
  nama: string;
  nip: string;
};

export default function TambahBerkalaPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [pegawai, setPegawai] =
    useState<Pegawai[]>([]);

  const [file, setFile] =
    useState<File | null>(null);

  const [form, setForm] =
    useState({
      pegawaiId: "",
      tanggalBerkala: "",
      status: "",
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

    const loadBerkala =
        async () => {
            try {
            const response =
                await getBerkalaById(
                id
                );

            const data =
                response.data;

            setForm({
                pegawaiId:
                data.pegawaiId.toString(),
                tanggalBerkala:
                data.tanggalBerkala
                    .split("T")[0],
                status:
                data.status,
            });
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

        await updateBerkala(
            id,     
            formData
        );

        alert(
          "Data berhasil ditambahkan"
        );

        router.push(
          "/berkala"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Gagal menambahkan data"
        );
      }
    };

  const inputClass =
    "w-full border rounded p-2";

  return (
    <ManagementLayout>
      <h1 className="text-3xl font-bold mb-5">
        Edit Berkala
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="
          bg-white
          p-5
          rounded-lg
          shadow
          space-y-4
        "
      >
        <div>
          <label>
            Pegawai
          </label>

          <select
            value={
              form.pegawaiId
            }
            onChange={(e) =>
              setForm({
                ...form,
                pegawaiId:
                  e.target.value,
              })
            }
            className={
              inputClass
            }
          >
            <option value="">
              Pilih Pegawai
            </option>

            {pegawai.map(
              (item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.nama}
                  {" - "}
                  {item.nip}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label>
            Tanggal Berkala
          </label>

          <input
            type="date"
            value={
              form.tanggalBerkala
            }
            onChange={(e) =>
              setForm({
                ...form,
                tanggalBerkala:
                  e.target.value,
              })
            }
            className={
              inputClass
            }
          />
        </div>

        <div>
          <label>
            Status
          </label>

          <select
            value={
              form.status
            }
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
            className={
              inputClass
            }
          >
            <option value="BELUM">

              Belum

              </option>

              <option value="SUDAH">

              Sudah

              </option>
          </select>
        </div>

        <div>
          <label>
            File SK (PDF)
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ||
                  null
              )
            }
            className={
              inputClass
            }
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
    </ManagementLayout>
  );
}