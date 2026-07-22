"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/ui/PageHeader";
import SearchBar from "@/components/ui/SearchBar";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button"

import {
  getUsers,
  deleteUser,
} from "@/services/user.service";

type User = {
  id: number;
  nama: string;
  username: string;
  role: string;
};

export default function UserPage() {
  const { user: loginUser } =
    useAuth();

  const [users, setUser] =
    useState<User[]>([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response =
        await getUsers();

      setUser(
        response.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] =
    useState("");

    const filteredUsers =
      users.filter((item)=>

      item.nama
      .toLowerCase()
      .includes(
      search.toLowerCase()
      )

      ||

      item.username
      .toLowerCase()
      .includes(
      search.toLowerCase()
      )

      );

  const handleDelete =
    async (id: number) => {
      const confirmDelete =
        confirm(
          "Yakin ingin menghapus data?"
        );

      if (!confirmDelete) return;

      try {
        await deleteUser(id);

        alert(
          "Data berhasil dihapus"
        );

        loadUser();
      } catch (error) {
        console.log(error);

        alert(
          "Terjadi Kesalahan"
        );
      }
    };

  return (
    <AdminLayout>
      <PageHeader
        title="Data User"
      />

      <div className="grid grid-cols-4 gap-5 mb-6">

      <div className="bg-white shadow rounded-xl p-5">

        <h2 className="text-4xl font-bold">

          {users.length}

        </h2>

        <p>Total User</p>

      </div>

      <div className="bg-red-50 shadow rounded-xl p-5">

        <h2 className="text-4xl font-bold">

          {
            users.filter(
              u=>u.role==="ADMIN"
            ).length
          }

        </h2>

        <p>Administrator</p>

      </div>

      <div className="bg-blue-50 shadow rounded-xl p-5">

        <h2 className="text-4xl font-bold">

          {
            users.filter(
              u=>u.role==="OPERATOR"
            ).length
          }

        </h2>

        <p>Operator</p>

      </div>

      <div className="bg-green-50 shadow rounded-xl p-5">

        <h2 className="text-4xl font-bold">

          {
            users.filter(
              u=>u.role==="PIMPINAN"
            ).length
          }

        </h2>

        <p>Pimpinan</p>

      </div>

    </div>

      <div className="flex justify-between items-center mb-5">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cari nama atau username..."
        />

        <Button
          href="/user/tambah"
        >
          👤 + Tambah User
        </Button>

      </div>

      <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                No
              </th>

              <th className="p-3 text-left">
                Nama
              </th>

              <th className="p-3 text-center">
                Username
              </th>

              <th className="p-3 text-center">
                Role
              </th>

              <th className="p-3 text-center">
                Status
              </th>

              <th className="p-3 text-center">
                Aksi
              </th>
            </tr>

            
          </thead>

          <tbody>
            {filteredUsers.map(
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
                  <td className="p-3">
                    {item.username}
                  </td>
                  <td className="p-3 text-center">
                    {
                      <RoleBadge
                        role={item.role}
                      />
                      }
                  </td>

                  <td className="p-3 text-center">

                  {
                  loginUser?.id===item.id ?

                  <span
                  className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                  >

                  Sedang Login

                  </span>

                  :

                  <span
                  className="
                  bg-gray-100
                  text-gray-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                  >

                  Aktif

                  </span>

                  }

                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/user/edit/${item.id}`}
                      className="
                        bg-yellow-500
                        text-white
                        px-3
                        py-1
                        rounded
                        mr-2
                      "
                    >
                      Edit User
                    </Link>

                    <Link
                      href={`/user/password/${item.id}`}
                      className="
                        bg-blue-600
                        text-white
                        px-3
                        py-1
                        rounded
                        mr-2
                      "
                    >
                      🔑 Reset Password
                    </Link>

                    <button
                      disabled={
                          loginUser?.id === item.id
                      }

                      onClick={() =>
                          handleDelete(item.id)
                      }

                      className={`
                          px-3
                          py-1
                          rounded
                          text-white
                          ${
                              loginUser?.id === item.id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-500"
                          }
                      `}
                    >
                        🗑️ Hapus User
                    </button>
                  </td>
                </tr>
              )
            )}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
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