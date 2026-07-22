"use client";

import DashboardCards from "@/components/ui/DashboardCard";

type Props = {
    dashboard:any;
};

export default function OperatorSummary({
    dashboard,
}:Props){

    return(

        <div className="mt-6">

            <div className="mb-4">

                <h2
                className="
                text-2xl
                font-bold
                text-slate-800
                "
                >

                    📊 Ringkasan Data

                </h2>

                <p
                className="
                text-gray-500
                mt-1
                "
                >

                    Informasi kondisi data kepegawaian saat ini.

                </p>

            </div>

            <DashboardCards
                dashboard={dashboard}
            />

        </div>

    );

}