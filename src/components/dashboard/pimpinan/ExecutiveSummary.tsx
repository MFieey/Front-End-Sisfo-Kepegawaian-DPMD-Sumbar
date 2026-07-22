type Props = {
    dashboard: any;
};

export default function ExecutiveSummary({
    dashboard,
}: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            <div className="flex items-center gap-3 mb-5">

                <div className="text-3xl">

                    📋

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-green-700">

                        Ringkasan Eksekutif

                    </h2>

                    <p className="text-gray-500">

                        Kondisi Kepegawaian Saat Ini

                    </p>

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-green-50 rounded-lg p-4">

                    👥 Total Pegawai

                    <h3 className="text-3xl font-bold text-green-700">

                        {dashboard.totalPegawai}

                    </h3>

                </div>

                <div className="bg-yellow-50 rounded-lg p-4">

                    📅 Berkala Bulan Ini

                    <h3 className="text-3xl font-bold text-yellow-700">

                        {dashboard.totalMonitoringBerkala}

                    </h3>

                </div>

                <div className="bg-red-50 rounded-lg p-4">

                    📈 Naik Pangkat

                    <h3 className="text-3xl font-bold text-red-700">

                        {dashboard.totalMonitoringPangkat}

                    </h3>

                </div>

                <div className="bg-pink-50 rounded-lg p-4">

                    🎂 Ulang Tahun

                    <h3 className="text-3xl font-bold text-pink-700">

                        {dashboard.ulangTahunBulanIni.length}

                    </h3>

                </div>

            </div>

        </div>

    );

}