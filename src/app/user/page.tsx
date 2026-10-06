"use client";

import { useEffect, useState } from "react";
import UserActionButtons from "@/components/ui/UserActionButtons";
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
        subtitle="Kelola seluruh akun administrator, operator, dan pimpinan."
        icon="👤"
    >
        <Button href="/user/tambah">
            + Tambah User
        </Button>
    </PageHeader>

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

      <div className="my-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cari nama atau username..."
        />
      </div>

      <div
          className="
          bg-white
          rounded-2xl
          shadow
          overflow-hidden
        "
      >
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
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4">
                    {item.nama}
                  </td>
                  <td className="p-4">
                    {item.username}
                  </td>
                  <td className="p-4 text-center">
                    {
                      <RoleBadge
                        role={item.role}
                      />
                      }
                  </td>

                  <td className="p-4 text-center">

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

                  <td className="p-4 text-center">
                    <UserActionButtons
                        editHref={`/user/edit/${item.id}`}
                        resetHref={`/user/password/${item.id}`}
                        disabled={loginUser?.id === item.id}
                        onDelete={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              )
            )}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={6}
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