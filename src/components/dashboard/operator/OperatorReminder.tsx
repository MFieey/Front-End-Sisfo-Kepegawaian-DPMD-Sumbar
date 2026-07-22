"use client";

import ReminderTable from "@/components/ui/MonitoringTable";

type Props = {
    dashboard: any;
};

export default function OperatorReminder({
    dashboard,
}: Props) {

    return (

        <div className="mt-6">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-slate-800">

                    🔔 Reminder Pegawai

                </h2>

                <p className="text-gray-500 mt-1">

                    Monitoring pegawai yang akan memasuki masa berkala dan kenaikan pangkat.

                </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <ReminderTable
                    title="📅 Masa Berkala"
                    data={dashboard.monitoringBerkala}
                    tanggalField="tanggalBerkala"
                />

                <ReminderTable
                    title="📈 Kenaikan Pangkat"
                    data={dashboard.monitoringPangkat}
                    tanggalField="tanggalPangkat"
                />

            </div>

        </div>

    );

}