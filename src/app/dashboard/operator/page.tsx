"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OperatorLayout from "@/components/layouts/OperatorLayout";

import DashboardFooter
from "@/components/dashboard/DashboardFooter";

import OperatorGreeting
from "@/components/dashboard/operator/OperatorGreeting";

import OperatorQuickMenu
from "@/components/dashboard/operator/OperatorQuickMenu";

import OperatorSummary
from "@/components/dashboard/operator/OperatorSummary";

import OperatorReminder
from "@/components/dashboard/operator/OperatorReminder";

import {
    getDashboard,
} from "@/services/dashboard.service";

import DashboardCards
from "@/components/ui/DashboardCard";

import BirthdayGrid
from "@/components/dashboard/BirthdayGrid";

import ReminderSection
from "@/components/dashboard/admin/MonitoringSection";

import AdminCharts
from "@/components/dashboard/admin/AdminCharts";

import ActivityAnalytics 
from "@/components/dashboard/ActivityAnalytics";

export default function DashboardOperatorPage(){

    const router =
    useRouter();

    const [dashboard,setDashboard]=
    useState<any>(null);

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard=
    async()=>{

        try{

            const response=
            await getDashboard();

            setDashboard(
                response.data
            );

        }catch(error:any){

            if(error.response?.status===401){

                router.replace("/login");

                return;

            }

            console.log(error);

        }

    };

    if(!dashboard){

        return(

            <OperatorLayout>

                Loading...

            </OperatorLayout>

        );

    }

    return (

        <OperatorLayout>

            <OperatorGreeting/>

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

        </OperatorLayout>

    );

}