"use client";

import Link from "next/link";

const menus = [
  {
    title: "Kelola Pegawai",
    description: "Tambah, ubah dan hapus data pegawai.",
    href: "/pegawai",
    icon: "👥",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Masa Berkala",
    description: "Monitoring pegawai yang akan berkala.",
    href: "/berkala",
    icon: "📅",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Kenaikan Pangkat",
    description: "Monitoring pegawai yang akan naik pangkat.",
    href: "/kenaikan-pangkat",
    icon: "📈",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function OperatorQuickMenu() {

  return (

    <div className="mt-6">

      <div className="mb-4">

        <h2 className="text-2xl font-bold text-slate-800">

          🚀 Menu Cepat

        </h2>

        <p className="text-gray-500 mt-1">

          Akses fitur utama dengan cepat.

        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {menus.map((menu) => (

          <Link
            key={menu.href}
            href={menu.href}
            className="
            bg-white
            rounded-2xl
            shadow
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            p-6
            group
            "
          >

            <div
              className={`
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center
              text-3xl
              mb-5
              ${menu.color}
              `}
            >
              {menu.icon}
            </div>

            <h3 className="text-xl font-bold text-slate-800">

              {menu.title}

            </h3>

            <p className="text-gray-500 mt-2">

              {menu.description}

            </p>

            <div
              className="
              mt-5
              text-green-700
              font-semibold
              flex
              items-center
              gap-2
              group-hover:gap-4
              transition-all
              "
            >

              Buka Menu →

            </div>

          </Link>

        ))}

      </div>

    </div>

  );

}