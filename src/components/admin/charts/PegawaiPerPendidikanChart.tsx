"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function PegawaiPerPendidikanChart({
  data,
}: {
  data: any[];
}) {

  const chartData = {
    labels: data.map(
      (item) => item.nama
    ),
    datasets: [
      {
        data: data.map(
          (item) => item._count.pegawai
        ),
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#F97316",
          "#84CC16",
          "#EC4899",
          "#6366F1",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  return (

    <div className="h-56">

      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              position: "bottom",
            },
          },

          animation: {
            duration: 1200,
          },
        }}
      />

    </div>

  );
}