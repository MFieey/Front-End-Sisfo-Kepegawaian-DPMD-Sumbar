"use client";

import { useState, useEffect } from "react";
import { getDashboard } from "@/services/dashboard.service";
import PimpinanLayout from "@/components/layouts/PimpinanLayout";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import MonitoringReportSummary from "@/components/laporan/MonitoringReportSummary";
import MonitoringReportChart
from "@/components/laporan/MonitoringReportChart";

import {

    exportMonitoringPdf,

    exportPegawaiExcel,

    exportPegawaiPdf,

    exportMonitoringPeriodePdf,

    exportMonitoringPeriodeExcel,

} from "@/services/export.service";

export default function LaporanMonitoringPage(){

    const [dashboard,setDashboard]=

        useState<any>(null);
    useEffect(()=>{

        loadDashboard();

    },[]);

    const [type, setType] = useState("monthly");

    const [month, setMonth] = useState(
        new Date().getMonth() + 1
    );

    const [year, setYear] = useState(
        new Date().getFullYear()
    );

    const loadDashboard=async()=>{

        const response=

        await getDashboard();

        setDashboard(

            response.data

        );

    };

    const handleExportPegawaiPdf = async () => {

        try {

            const response =
                await exportPegawaiPdf();

            const url =
                window.URL.createObjectURL(

                    new Blob([response.data])

                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "Data_Pegawai.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (err) {

            console.error(err);

            alert("Gagal Export PDF");

        }

    };

    const handleExportPegawaiExcel = async () => {

        try {

            const response =
                await exportPegawaiExcel();

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "Data_Pegawai.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (err) {

            console.error(err);

            alert("Gagal Export Excel");

        }

    };

    const handleExportMonitoringPdf = async () => {

        try {

            const response =
                await exportMonitoringPdf();

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "Laporan_Progress_Monitoring.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (err) {

            console.error(err);

            alert("Gagal Export PDF");

        }

    };

    const handleExportPeriodePdf = async () => {

        try {

            const response =
                await exportMonitoringPeriodePdf(
                    type,
                    month,
                    year
                );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "Laporan_Monitoring_Periode.pdf";

            link.click();

        } catch (err) {

            console.log(err);

        }

    };

    const handleExportPeriodeExcel = async () => {

        try {

            const response =
                await exportMonitoringPeriodeExcel(
                    type,
                    month,
                    year
                );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "Laporan_Monitoring_Periode.xlsx";

            link.click();

        } catch (err) {

            console.log(err);

        }

    };

    if (!dashboard) {
        return (
            <PimpinanLayout>
                <div className="p-10 text-center">
                    Memuat data dashboard...
                </div>
            </PimpinanLayout>
        );
    }

    return(

        <PimpinanLayout>

            <PageHeader
                title="Laporan Monitoring"
                subtitle="Laporan hasil monitoring data kepegawaian."
                icon="📄"
            />

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

                <h2 className="text-xl font-bold text-green-700">

                    📋 Laporan Data Pegawai

                </h2>

                <p className="text-gray-500 mt-2">

                    Export seluruh data pegawai dalam format Excel.

                </p>

                <div className="mt-5">

                    <div className="flex gap-3 mt-5">

                        <Button
                            variant="secondary"
                            onClick={handleExportPegawaiPdf}
                        >

                            📄 Export PDF

                        </Button>

                        <Button
                            onClick={handleExportPegawaiExcel}
                        >

                            📊 Export Excel

                        </Button>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

                <h2 className="text-xl font-bold text-green-700">

                    📊 Laporan Progress Monitoring

                </h2>

                <p className="text-gray-500 mt-2">

                    Export ringkasan monitoring kepegawaian dalam bentuk PDF.

                </p>

                <div className="mt-5">

                    <Button
                        variant="secondary"
                        onClick={handleExportMonitoringPdf}
                    >

                        📄 Export PDF

                    </Button>

                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

                <h2 className="text-xl font-bold text-green-700">

                    📅 Laporan Monitoring Periode

                </h2>

                <p className="text-gray-500 mt-2">

                    Export laporan monitoring berdasarkan periode bulanan atau tahunan.

                </p>

                <div className="mt-6">

                    <label className="font-semibold">

                        Jenis Periode

                    </label>

                    <div className="flex gap-8 mt-3">

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="radio"
                                checked={type === "monthly"}
                                onChange={() => setType("monthly")}
                                className="accent-green-700"
                            />

                            Bulanan

                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="radio"
                                checked={type === "yearly"}
                                onChange={() => setType("yearly")}
                                className="accent-green-700"
                            />

                            Tahunan

                        </label>

                    </div>

                    <div
                        className={`grid gap-6 mt-5 ${
                            type === "monthly"
                                ? "grid-cols-2"
                                : "grid-cols-1"
                        }`}
                    >

                        {
                            type === "monthly" && (

                                <div>

                                    <label className="font-semibold">

                                        Bulan

                                    </label>

                                    <select
                                        value={month}
                                        onChange={(e)=>
                                            setMonth(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="
                                            w-full
                                            border
                                            rounded-xl
                                            p-3
                                            mt-2
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-600
                                        "
                                    >

                                        {

                                            Array.from(
                                                { length: 12 },
                                                (_, i) => (

                                                    <option
                                                        key={i}
                                                        value={i + 1}
                                                    >

                                                        {

                                                            new Date(
                                                                2025,
                                                                i
                                                            ).toLocaleString(
                                                                "id-ID",
                                                                {
                                                                    month: "long",
                                                                }
                                                            )

                                                        }

                                                    </option>

                                                ))

                                        }

                                    </select>

                                </div>

                            )
                        }

                        <div>

                            <label className="font-semibold">

                                Tahun

                            </label>

                            <input
                                type="number"
                                value={year}
                                onChange={(e)=>
                                    setYear(
                                        Number(e.target.value)
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    p-3
                                    mt-2
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-600
                                "
                            />

                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">

                            <Button
                                variant="secondary"
                                onClick={handleExportPeriodePdf}
                            >
                                📄 Export PDF
                            </Button>

                            <Button
                                variant="primary"
                                onClick={handleExportPeriodeExcel}
                            >
                                📊 Export Excel
                            </Button>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-8">
                <MonitoringReportSummary

                    totalPegawai={
                        dashboard.totalPegawai
                    }

                    totalBerkala={
                        dashboard.totalMonitoringBerkala
                    }

                    totalPangkat={
                        dashboard.totalMonitoringPangkat
                    }

                    totalSudah={

                        dashboard.totalBerkalaSudah+

                        dashboard.totalPangkatSudah

                    }

                    totalBelum={

                        dashboard.totalBerkalaBelum+

                        dashboard.totalPangkatBelum

                    }

                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 mb-6">

                <MonitoringReportChart
                    title="📅 Grafik Monitoring Berkala"
                    sudah={dashboard.totalBerkalaSudah}
                    belum={dashboard.totalBerkalaBelum}
                />

                <MonitoringReportChart
                    title="📈 Grafik Monitoring Kenaikan Pangkat"
                    sudah={dashboard.totalPangkatSudah}
                    belum={dashboard.totalPangkatBelum}
                />

            </div>

        </PimpinanLayout>

    );

}