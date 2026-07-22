"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function PegawaiPerBidangChart({
    data,
}: {
    data: any[];
}) {

    const chartData = {
        labels: data.map((item) => item.nama),
        datasets: [
            {
                data: data.map(
                    (item) => item._count.pegawai
                ),
                backgroundColor:
                    "rgba(59,130,246,0.7)",
                borderRadius:8,
            },
        ],
    };

    return (

        <div className="h-56">

            <Bar
                data={chartData}
                options={{
                    responsive:true,
                    maintainAspectRatio:false,

                    plugins:{
                        legend:{
                            display:false,
                        },
                    },
                }}
            />

        </div>

    );

}