type Props = {
    dashboard: any;
};

export default function ActivityAnalytics({
    dashboard,
}: Props) {

    return (

        <div className="space-y-6">

            {/* Statistik Aktivitas */}
            <div>

                <h2 className="text-xl font-bold text-gray-800 mb-4">

                    📊 Ringkasan Aktivitas Sistem

                </h2>

                <div className="grid grid-cols-3 gap-6">

                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">

                        <div className="text-4xl">📜</div>

                        <h2 className="text-3xl font-bold mt-4">

                            {dashboard.totalLog}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Total Aktivitas

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">

                        <div className="text-4xl">🔐</div>

                        <h2 className="text-3xl font-bold mt-4 text-blue-600">

                            {dashboard.totalLogin}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Total Login

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">

                        <div className="text-4xl">⚙️</div>

                        <h2 className="text-3xl font-bold mt-4 text-green-600">

                            {dashboard.totalCrud}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Total CRUD

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}