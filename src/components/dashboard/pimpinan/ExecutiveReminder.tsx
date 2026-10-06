import Button from "@/components/ui/Button";

type Props = {
    dashboard: any;
};

export default function ExecutiveReminder({
    dashboard,
}: Props) {

    const progressBerkala =
    dashboard.totalMonitoringBerkala > 0
        ? Math.round(
              (dashboard.totalBerkalaSelesai /
                  dashboard.totalMonitoringBerkala) *
                  100
          )
        : 0;

    const progressPangkat =
        dashboard.totalMonitoringPangkat > 0
            ? Math.round(
                (dashboard.totalPangkatSelesai /
                    dashboard.totalMonitoringPangkat) *
                    100
            )
            : 0;

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            <div className="mb-5">

                <h2 className="text-2xl font-bold text-slate-800">

                    📋 Monitoring Kepegawaian

                </h2>

                <p className="text-gray-500 mt-1">

                    Ringkasan status monitoring masa berkala dan kenaikan pangkat.

                </p>

            </div>

            <div className="grid md:grid-cols-1 gap-6">

                {/* BERKALA */}

                <div className="grid grid-cols-2 gap-5 mt-6">
                    <div className="bg-yellow-80 rounded-xl shadow p-6">

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

                                    <div className="mt-4 space-y-2 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-green-600">
                                                🟢 Selesai
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalBerkalaSelesai}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-blue-600">
                                                🔵 Proses
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalBerkalaProses}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-yellow-600">
                                                🟡 Belum
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalBerkalaBelum}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-red-600">
                                                🔴 Tidak Naik
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalBerkalaTidakNaik}
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

                                <div className="mt-5">

                                    <p className="text-sm font-medium text-gray-600">

                                        Progress Monitoring

                                    </p>

                                    <div className="w-full h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">

                                        <div
                                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${progressBerkala}%`,
                                            }}
                                        />

                                    </div>

                                    <p className="text-right text-sm text-green-600 font-semibold mt-1">

                                        {progressBerkala}%

                                    </p>

                                </div>

                                <Button

                                    href="/berkala"

                                    variant="secondary"

                                >

                                    📅 Lihat Detail

                                </Button>

                            </div>

                        </div>

                    <div className="bg-red-100 rounded-xl shadow p-6">

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

                                    <div className="mt-4 space-y-2 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-green-600">
                                                🟢 Selesai
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalPangkatSelesai}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-blue-600">
                                                🔵 Proses
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalPangkatProses}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-yellow-600">
                                                🟡 Belum
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalPangkatBelum}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-red-600">
                                                🔴 Tidak Naik
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.totalPangkatTidakNaik}
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

                                <div className="mt-5">

                                    <p className="text-sm font-medium text-gray-600">

                                        Progress Monitoring

                                    </p>

                                    <div className="w-full h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">

                                        <div
                                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${progressPangkat}%`,
                                            }}
                                        />

                                    </div>

                                    <p className="text-right text-sm text-green-600 font-semibold mt-1">

                                        {progressPangkat}%

                                    </p>

                                    </div>

                                <Button

                                    href="/kenaikan-pangkat"

                                    variant="secondary"

                                >

                                    📈 Lihat Detail

                                </Button>

                            </div>

                        </div>

                    </div>

            </div>

        </div>

    );

}