type Props = {
    role: string;
};

export default function SystemInformation({
    role,
}: Props) {

    return (

        <div className="grid grid-cols-4 gap-5 mb-6">

            <div className="bg-green-50 rounded-xl shadow p-5">

                <p className="text-green-700">
                    🖥 Status Sistem
                </p>

                <h2 className="font-bold mt-2">
                    Normal
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Semua layanan berjalan normal.
                </p>

            </div>

            <div className="bg-blue-50 rounded-xl shadow p-5">

                <p className="text-blue-700">
                    💾 Database
                </p>

                <h2 className="font-bold mt-2">
                    Terhubung
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    MySQL Connected
                </p>

            </div>

            <div className="bg-yellow-50 rounded-xl shadow p-5">

                <p className="text-yellow-700">
                    👥 User Aktif
                </p>

                <h2 className="font-bold mt-2">
                    3 User
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Administrator,
                    Operator,
                    Pimpinan
                </p>

            </div>

            <div className="bg-red-50 rounded-xl shadow p-5">

                <p className="text-red-700">
                    🔐 Hak Akses
                </p>

                <h2 className="font-bold mt-2">
                    {role}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Akses penuh sistem
                </p>

            </div>

        </div>

    );

}