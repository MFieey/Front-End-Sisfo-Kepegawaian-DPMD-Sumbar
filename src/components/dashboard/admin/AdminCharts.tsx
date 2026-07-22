import ChartCard
from "@/components/dashboard/ChartCard";

import PegawaiPerBidangChart
from "@/components/admin/charts/PegawaiPerBidangChart";

import PegawaiPerGolonganChart
from "@/components/admin/charts/PegawaiPerGolonganChart";

import PegawaiPerPendidikanChart
from "@/components/admin/charts/PegawaiPerPendidikanChart";

type Props = {
    dashboard: any;
};

export default function AdminCharts({
    dashboard,
}: Props) {

    return (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <ChartCard
                title="Per Bidang"
                icon="🏢"
                color="from-blue-600 to-cyan-500"
            >

                <PegawaiPerBidangChart
                    data={dashboard.pegawaiPerBidang}
                />

            </ChartCard>

            <ChartCard
                title="Per Golongan"
                icon="🎖️"
                color="from-amber-500 to-yellow-400"
            >

                <PegawaiPerGolonganChart
                    data={dashboard.pegawaiPerGolongan}
                />

            </ChartCard>

            <ChartCard
                title="Per Pendidikan"
                icon="🎓"
                color="from-emerald-600 to-green-500"
            >

                <PegawaiPerPendidikanChart
                    data={dashboard.pegawaiPerPendidikan}
                />

            </ChartCard>

        </div>

    );

}