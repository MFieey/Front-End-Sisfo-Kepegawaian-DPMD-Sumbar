"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [

    {
        title: "MENU UTAMA",
        menus: [
            {
                icon: "🏠",
                name: "Dashboard",
                href: "/dashboard/admin",
            },
        ],
    },
    
        {
        title: "MONITORING",
        menus: [
            {
                icon: "📅",
                name: "Monitoring Berkala",
                href: "/berkala",
            },
            {
                icon: "📈",
                name: "Monitoring Pangkat",
                href: "/kenaikan-pangkat",
            },
        ],
    },

    {
        title: "MASTER DATA",
        menus: [
            {
                icon: "👥",
                name: "Pegawai",
                href: "/pegawai",
            },
            {
                icon: "🏢",
                name: "Bidang",
                href: "/bidang",
            },
            {
                icon: "💼",
                name: "Jabatan",
                href: "/jabatan",
            },
            {
                icon: "🎖️",
                name: "Golongan",
                href: "/golongan",
            },
            {
                icon: "🎓",
                name: "Pendidikan",
                href: "/pendidikan",
            },
            {
                icon: "👤",
                name: "Manajemen User",
                href: "/user",
            },
        ],
    },

    {
        title: "LAPORAN",
        menus: [
            {
                icon: "📄",
                name: "Laporan Monitoring",
                href: "/laporan",
            },
        ],
    },

    {
        title: "AUDIT TRAIL",
        menus: [
            {
                icon: "🛡️",
                name: "Audit Trail Sistem",
                href: "/log-aktivitas",
            },
        ],
    },

];

export default function AdminSidebar() {

    const pathname = usePathname();

    return (

        <aside
            className="
            w-64
            bg-gradient-to-b
            from-slate-900
            to-slate-800
            text-white
            min-h-screen
            border-r
            border-slate-700
            flex
            flex-col
            "
        >

            <div
                className="
                px-6
                py-7
                border-b
                border-slate-700
                "
            >

                <h1 className="text-3xl font-bold">

                    SISFO

                </h1>

                <p className="text-slate-300 text-sm mt-1">

                    Sistem Informasi Kepegawaian

                </p>

            </div>

            <nav className="flex-1 overflow-y-auto">

                {sections.map((section) => (

                    <div
                        key={section.title}
                        className="mt-5"
                    >

                        <p
                            className="
                            px-6
                            mb-2
                            text-xs
                            uppercase
                            tracking-widest
                            text-slate-400
                            font-bold
                            "
                        >

                            {section.title}

                        </p>

                        <div className="px-3 space-y-1">

                            {section.menus.map((menu) => (

                                <Link
                                    key={menu.href}
                                    href={menu.href}
                                    className={`
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-xl
                                    transition
                                    font-medium

                                    ${
                                        pathname === menu.href

                                            ? "bg-blue-600 shadow"

                                            : "hover:bg-slate-700"
                                    }
                                    `}
                                >

                                    <span
                                        className="
                                        w-6
                                        text-center
                                        "
                                    >

                                        {menu.icon}

                                    </span>

                                    {menu.name}

                                </Link>

                            ))}

                        </div>

                    </div>

                ))}

            </nav>

            <div
                className="
                border-t
                border-slate-700
                p-5
                text-center
                text-xs
                text-slate-400
                "
            >

                © 2026 SISFO DPMD

            </div>

        </aside>

    );

}