"use client";

import { useEffect, useState } from "react";

import PimpinanLayout
from "@/components/layouts/PimpinanLayout";

import {
    getDashboard,
} from "@/services/dashboard.service";

import PimpinanGreeting
from "@/components/dashboard/pimpinan/PimpinanGreeting";

import ExecutiveSummary
from "@/components/dashboard/pimpinan/ExecutiveSummary";

import ExecutiveReminder
from "@/components/dashboard/pimpinan/ExecutiveReminder";

import ExecutiveInsight
from "@/components/dashboard/pimpinan/ExecutiveInsight";

import DashboardFooter
from "@/components/dashboard/DashboardFooter";

import ChartCard
from "@/components/dashboard/ChartCard";

import PegawaiPerBidangChart
from "@/components/admin/charts/PegawaiPerBidangChart";

import PegawaiPerGolonganChart
from "@/components/admin/charts/PegawaiPerGolonganChart";

import PegawaiPerPendidikanChart
from "@/components/admin/charts/PegawaiPerPendidikanChart";

import BirthdayGrid
from "@/components/dashboard/BirthdayGrid";

import ExecutiveStatus
from "@/components/dashboard/pimpinan/ExecutiveStatus";

export default function DashboardPimpinanPage(){

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

        }catch(error){

            console.log(error);

        }

    };

    if(!dashboard){

        return(

            <PimpinanLayout>

                Loading...

            </PimpinanLayout>

        );

    }

    return(

        <PimpinanLayout>

            <PimpinanGreeting/>

            <ExecutiveStatus/>

            <ExecutiveSummary
                dashboard={dashboard}
            />

            <ExecutiveReminder
                dashboard={dashboard}
            />
            
            <BirthdayGrid
                data={dashboard.ulangTahunBulanIni}
            /><br/>
            
            <ExecutiveInsight
                dashboard={dashboard}
            />

            <div className="grid grid-cols-3 gap-6 mb-6">

          <ChartCard
              title="Distribusi Pegawai per Bidang"
          >

              <PegawaiPerBidangChart
                  data={dashboard.pegawaiPerBidang}
              />

          </ChartCard>

          <ChartCard
              title="Distribusi Pegawai per Golongan"
          >

              <PegawaiPerGolonganChart
                  data={dashboard.pegawaiPerGolongan}
              />

          </ChartCard>

          <ChartCard
              title="Distribusi Pegawai Berdasarkan Pendidikan"
          >

              <PegawaiPerPendidikanChart
                  data={dashboard.pegawaiPerPendidikan}
              />

          </ChartCard>

        </div>

        

        <DashboardFooter/>

        </PimpinanLayout>

    );

}