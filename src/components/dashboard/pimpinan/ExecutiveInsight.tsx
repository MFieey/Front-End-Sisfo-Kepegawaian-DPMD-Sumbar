type Props = {
    dashboard: any;
};

export default function ExecutiveInsight({
    dashboard,
}: Props) {

    return (

        <div className="mb-6">

            <div className="flex items-center gap-3 mb-4">

                <div className="text-3xl">

                    💡

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-green-700">

                        Insight Kepegawaian

                    </h2>

                    <p className="text-gray-500">

                        Ringkasan kondisi pegawai saat ini

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-4 gap-5">

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="text-5xl mb-3">

                        ✅

                    </div>

                    <h3 className="font-bold text-green-700">

                        Total Pegawai

                    </h3>

                    <p className="mt-3 text-gray-600">

                        Saat ini terdapat

                        <b> {dashboard.totalPegawai} </b>

                        pegawai aktif.

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="text-5xl mb-3">

                        📅

                    </div>

                    <h3 className="font-bold text-yellow-700">

                        Berkala

                    </h3>

                    <p className="mt-3 text-gray-600">

                        <b>{dashboard.totalReminderBerkala}</b>

                        pegawai akan memasuki masa berkala.

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="text-5xl mb-3">

                        📈

                    </div>

                    <h3 className="font-bold text-red-600">

                        Pangkat

                    </h3>

                    <p className="mt-3 text-gray-600">

                        <b>{dashboard.totalReminderPangkat}</b>

                        pegawai akan naik pangkat.

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="text-5xl mb-3">

                        🎂

                    </div>

                    <h3 className="font-bold text-pink-600">

                        Ulang Tahun

                    </h3>

                    <p className="mt-3 text-gray-600">

                        <b>{dashboard.ulangTahunBulanIni.length}</b>

                        pegawai berulang tahun bulan ini.

                    </p>

                </div>

            </div>

        </div>

    );

}