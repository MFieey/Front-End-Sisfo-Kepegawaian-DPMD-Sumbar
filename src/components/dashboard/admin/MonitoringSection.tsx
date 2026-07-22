import ReminderTable from "@/components/ui/MonitoringTable";
import Button from "@/components/ui/Button";
import MonitoringTable from "@/components/ui/MonitoringTable";

type Props = {
    dashboard: any;
};

export default function ReminderSection({
    dashboard,
}: Props) {

    return (

        <>


            {/* MOnitoring Berkala */}
    <div className="grid grid-cols-2 gap-5 mt-6">
      <div className="bg-yellow-50 rounded-xl shadow p-6">

            <div className="flex items-center gap-5">

                <div className="text-6xl">

                    📅

                </div>

                <div>

                    <p className="text-gray-700">

                        Monitoring Berkala

                    </p>

                    <h2
                        className="
                        text-5xl
                        font-bold
                        text-yellow-600
                        "
                    >

                        {dashboard.totalMonitoringBerkala}

                    </h2>

                    <p
                        className="
                        text-yellow-700
                        font-semibold
                        "
                    >

                        Pegawai

                    </p>

                    <div className="mt-4 space-y-1 text-sm">

                        <div className="flex justify-between">

                            <span className="text-green-700">

                            🟢 Sudah

                            </span>

                            <span className="font-bold">

                            {dashboard.totalBerkalaSudah}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-yellow-700">

                            🟡 Belum

                            </span>

                            <span className="font-bold">

                            {dashboard.totalBerkalaBelum}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-5">

                <p className="text-gray-600 mb-4">

                    Monitoring pegawai yang akan
                    dan telah melaksanakan
                    kenaikan gaji berkala.

                </p>

                <Button

                    href="/berkala"

                    variant="secondary"

                >

                    📅 Lihat Detail

                </Button>

            </div>

        </div>

      <div className="bg-red-50 rounded-xl shadow p-6">

            <div className="flex items-center gap-5">

                <div className="text-6xl">

                    📈

                </div>

                <div>

                    <p className="text-gray-700">

                        Monitoring Pangkat

                    </p>

                    <h2
                        className="
                        text-5xl
                        font-bold
                        text-red-600
                        "
                    >

                        {dashboard.totalMonitoringPangkat}

                    </h2>

                    <p
                        className="
                        text-red-700
                        font-semibold
                        "
                    >

                        Pegawai

                    </p>

                    <div className="mt-4 space-y-1 text-sm">

                        <div className="flex justify-between">

                            <span className="text-green-700">

                            🟢 Sudah

                            </span>

                            <span className="font-bold">

                            {dashboard.totalPangkatSudah}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-yellow-700">

                            🟡 Belum

                            </span>

                            <span className="font-bold">

                            {dashboard.totalPangkatBelum}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-5">

                <p className="text-gray-600 mb-4">

                    Monitoring pegawai yang akan
                    dan telah naik pangkat.

                </p>

                <Button

                    href="/kenaikan-pangkat"

                    variant="secondary"

                >

                    📈 Lihat Detail

                </Button>

            </div>

        </div>

    </div>

        </>

    );

}