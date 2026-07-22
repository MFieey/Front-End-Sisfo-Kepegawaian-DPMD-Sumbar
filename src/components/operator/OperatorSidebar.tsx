"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuGroups = [
    {
        title: "Dashboard",
        menus: [
            {
                icon: "🏠",
                name: "Dashboard",
                href: "/dashboard/operator",
            },
        ],
    },
    {
        title: "Monitoring",
        menus: [
            {
                icon: "📅",
                name: "Monitoring Berkala",
                href: "/berkala",
            },
            {
                icon: "📈",
                name: "Kenaikan Pangkat",
                href: "/kenaikan-pangkat",
            },
        ],
    },
    {
        title: "Data & Laporan",
        menus: [
            {
                icon: "👥",
                name: "Data Pegawai",
                href: "/pegawai",
            },
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

export default function OperatorSidebar() {

    const pathname = usePathname();

    return (

        <aside
            className="
            w-64
            bg-gradient-to-b
            from-green-900
            via-green-800
            to-green-700
            text-white
            min-h-screen
            flex
            flex-col
            shadow-xl
            "
        >

            {/* Header */}

            <div
                className="
                flex
                flex-col
                items-center
                py-7
                border-b
                border-green-600
                "
            >

                <Image
                    src="/logo-dpmd.png"
                    alt="Logo DPMD"
                    width={70}
                    height={70}
                    className="mb-3"
                />

                <h1 className="text-xl font-bold text-center leading-tight">

                    DPMD

                </h1>

                <p className="text-xs text-green-100 text-center mt-1 px-4">

                    Sistem Informasi Manajemen Kepegawaian

                </p>

            </div>

            {/* Menu */}

            <nav className="flex-1 px-4 py-5 overflow-y-auto">

                {menuGroups.map((group) => (

                    <div
                        key={group.title}
                        className="mb-7"
                    >

                        <h3
                            className="
                            text-xs
                            uppercase
                            tracking-widest
                            text-green-200
                            mb-3
                            px-2
                            "
                        >

                            {group.title}

                        </h3>

                        <div className="space-y-2">

                            {group.menus.map((menu) => (

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
                                        transition-all
                                        duration-200
                                        font-medium

                                        ${
                                            pathname === menu.href
                                                ? "bg-white text-green-800 shadow-lg"
                                                : "hover:bg-green-600"
                                        }
                                    `}
                                >

                                    <span className="text-lg">

                                        {menu.icon}

                                    </span>

                                    <span>

                                        {menu.name}

                                    </span>

                                </Link>

                            ))}

                        </div>

                    </div>

                ))}

            </nav>

            {/* Footer */}

            <div
                className="
                border-t
                border-green-600
                py-5
                px-4
                text-center
                "
            >

                <p className="text-xs text-green-100">

                    Sistem Informasi Manajemen
                    <br />
                    Kepegawaian

                </p>

                <p className="mt-2 text-[11px] text-green-300">

                    © 2026 DPMD Sumatera Barat

                </p>

            </div>

        </aside>

    );

}