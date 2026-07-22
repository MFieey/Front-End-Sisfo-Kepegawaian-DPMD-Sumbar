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
  getUser,
  updateUser,
} from "@/services/user.service";

export default function EditUserPage() {

  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [nama, setNama] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [role, setRole] =
    useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser =
    async () => {

      try {

        const response =
          await getUser(id);

        setNama(
          response.data.nama
        );

        setUsername(
          response.data.username
        );

        setRole(
          response.data.role
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

        await updateUser(
          id,
          {
            nama,
            username,
            role,
          }
        );

        alert(
          "Data user berhasil diubah"
        );

        router.push("/user");

      } catch (error) {

        console.log(error);

        alert(
          "Gagal mengubah data"
        );

      }

    };

  const inputClass =
    `
      w-full
      border
      p-3
      rounded
    `;

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-5">
        Edit User
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

          <label>Nama</label>

          <input
            type="text"
            value={nama}
            onChange={(e)=>
              setNama(
                e.target.value
              )
            }
            className={inputClass}
          />

        </div>

        <div className="mb-4">

          <label>Username</label>

          <input
            type="text"
            value={username}
            disabled
            className="
            w-full
            border
            p-2
            rounded
            bg-gray-100
            cursor-not-allowed
            "
            />

        </div>

        <div className="mb-4">

          <label>Role</label>

          <select
            value={role}
            onChange={(e)=>
              setRole(
                e.target.value
              )
            }
            className={inputClass}
          >

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="OPERATOR">
              OPERATOR
            </option>

            <option value="PIMPINAN">
              PIMPINAN
            </option>

          </select>

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