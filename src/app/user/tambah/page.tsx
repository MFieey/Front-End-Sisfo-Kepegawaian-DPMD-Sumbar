"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layouts/AdminLayout";
import { createUser } from "@/services/user.service";

export default function TambahUserPage() {
  const router = useRouter();

  const [nama, setNama] =
    useState("");

  const [username, setUsername] =
  useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("");
  
  const inputClass =
    `
    w-full
    border
    p-3
    rounded
    `;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createUser({
        nama,
        username,
        password,
        role,
      });

      alert(
        "Data berhasil ditambahkan"
      );

      router.push("/user");
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
        Tambah User
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
            onChange={(e) =>
              setNama(e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div className="mb-4">
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className={inputClass}
          />
        </div>

        <div className="mb-4">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className={inputClass}
          />
        </div>

        <div className="mb-4">
          <label>Role</label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className={inputClass}
          >
            <option value="">
              Pilih Role
            </option>

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
            mt-2
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