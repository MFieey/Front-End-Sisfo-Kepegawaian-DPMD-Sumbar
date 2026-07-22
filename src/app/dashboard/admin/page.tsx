"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AdminLayout from "@/components/layouts/AdminLayout";

import PegawaiPerBidangChart 
from "@/components/admin/charts/PegawaiPerBidangChart";

import PegawaiPerGolonganChart
from "@/components/admin/charts/PegawaiPerGolonganChart";

import PegawaiPerPendidikanChart
from "@/components/admin/charts/PegawaiPerPendidikanChart";

import ReminderTable
from "@/components/ui/MonitoringTable";

import DashboardCards
from "@/components/ui/DashboardCard";

import {
  getDashboard,
} from "@/services/dashboard.service";

import BirthdayGrid
from "@/components/dashboard/BirthdayGrid";

import ChartCard
from "@/components/dashboard/ChartCard";

import AdminGreeting
from "@/components/dashboard/admin/AdminGreeting";

import SystemInformation
from "@/components/dashboard/admin/SystemInformation";

import ReminderSection
from "@/components/dashboard/admin/MonitoringSection";

import AdminCharts
from "@/components/dashboard/admin/AdminCharts";

import DashboardFooter
from "@/components/dashboard/DashboardFooter";

import ActivityAnalytics
from "@/components/dashboard/ActivityAnalytics";


export default function DashboardAdminPage() {

    const router = useRouter();

    const [dashboard, setDashboard] =
        useState<any>(null);

    const loadDashboard = async () => {

        try {

            const response =
                await getDashboard();

            console.log(response);

            setDashboard(
                response.data
            );

        } catch (error: any) {

            if (
                error.response?.status === 401
            ) {

                router.replace("/login");

                return;

            }

            console.log(error);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    if (!dashboard) {

        return (

            <AdminLayout>

                Loading...

            </AdminLayout>

        );

    }

return (

<AdminLayout>

    <AdminGreeting/>

    <div className="mt-6">

        <SystemInformation
        role="Administrator"
        />

    </div>

    <div className="mt-6">

        <DashboardCards
        dashboard={dashboard}
        />

    </div>

    <div className="mt-6">

        <ActivityAnalytics
            dashboard={dashboard}
        />

    </div>

    <div className="mt-6">

        <ReminderSection
        dashboard={dashboard}
        />

    </div>

    <div className="mt-6">

        <BirthdayGrid
        data={dashboard.ulangTahunBulanIni}
        />

    </div>

    <div className="mt-6">

        <AdminCharts
        dashboard={dashboard}
        />

    </div>

    <div className="mt-8">

        <DashboardFooter/>

    </div>

</AdminLayout>

);

}