type Props = {
    dashboard: any;
};

export default function ExecutiveReminder({
    dashboard,
}: Props) {

    return (

        <div className="mt-6">

            <div className="mb-5">

                <h2 className="text-2xl font-bold text-slate-800">

                    📋 Monitoring Kepegawaian

                </h2>

                <p className="text-gray-500 mt-1">

                    Ringkasan status monitoring masa berkala dan kenaikan pangkat.

                </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* BERKALA */}

                <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-xl font-bold text-green-700">

                                📅 Monitoring Berkala

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                                Total Monitoring :
                                {" "}
                                {dashboard.totalMonitoringBerkala}

                            </p>

                        </div>

                        <div className="text-5xl">

                            📅

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">

                        <div className="bg-green-50 rounded-xl p-4">

                            <p className="text-sm text-gray-500">

                                Sudah

                            </p>

                            <h2 className="text-3xl font-bold text-green-700">

                                {dashboard.totalBerkalaSudah}

                            </h2>

                        </div>

                        <div className="bg-red-50 rounded-xl p-4">

                            <p className="text-sm text-gray-500">

                                Belum

                            </p>

                            <h2 className="text-3xl font-bold text-red-600">

                                {dashboard.totalBerkalaBelum}

                            </h2>

                        </div>

                    </div>

                </div>

                {/* PANGKAT */}

                <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-xl font-bold text-blue-700">

                                📈 Monitoring Pangkat

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                                Total Monitoring :
                                {" "}
                                {dashboard.totalMonitoringPangkat}

                            </p>

                        </div>

                        <div className="text-5xl">

                            📈

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">

                        <div className="bg-blue-50 rounded-xl p-4">

                            <p className="text-sm text-gray-500">

                                Sudah

                            </p>

                            <h2 className="text-3xl font-bold text-blue-700">

                                {dashboard.totalPangkatSudah}

                            </h2>

                        </div>

                        <div className="bg-red-50 rounded-xl p-4">

                            <p className="text-sm text-gray-500">

                                Belum

                            </p>

                            <h2 className="text-3xl font-bold text-red-600">

                                {dashboard.totalPangkatBelum}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}