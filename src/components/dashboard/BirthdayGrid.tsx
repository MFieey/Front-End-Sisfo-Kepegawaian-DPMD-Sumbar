type Props = {
  data: any[];
};

export default function BirthdayGrid({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mt-6">

        <div className="flex items-center justify-between mb-6">

            <div>

                <h2 className="text-2xl font-bold text-gray-800">
                    🎂 Ulang Tahun Bulan Ini
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Daftar pegawai yang berulang tahun pada bulan ini.
                </p>

            </div>

            <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
                {data.length} Pegawai
            </div>

        </div>

        {data.length === 0 ? (

            <div className="text-center py-10">

                <div className="text-6xl mb-3">
                    🎉
                </div>

                <h3 className="text-lg font-semibold text-gray-700">
                    Tidak Ada Ulang Tahun
                </h3>

                <p className="text-gray-500 mt-2">
                    Belum ada pegawai yang berulang tahun pada bulan ini.
                </p>

            </div>

        ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {data.map((item: any) => (

                    <div
                        key={item.id}
                        className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        p-5
                        shadow-sm
                        hover:shadow-xl
                        hover:-translate-y-1
                        transition-all
                        duration-300
                        "
                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={
                                    item.foto
                                        ? `http://localhost:5000/uploads/foto/${item.foto}`
                                        : "/avatar.png"
                                }
                                className="
                                w-16
                                h-16
                                rounded-full
                                object-cover
                                border-4
                                border-green-200
                                "
                            />

                            <div>

                                <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">

                                    🎂 Ulang Tahun

                                </div>

                                <h3 className="font-bold text-gray-800">

                                    {item.nama}

                                </h3>

                            </div>

                        </div>

                        <div className="mt-5 space-y-2 text-sm">

                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    🎈 Umur
                                </span>

                                <span className="font-semibold">
                                    {item.umur} Tahun
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    📅 Tanggal
                                </span>

                                <span className="font-semibold">
                                    {item.hariUlangTahun}
                                </span>

                            </div>

                        </div>

                        <div className="mt-5 border-t pt-3">

                            <p className="text-center text-sm text-green-600 font-medium">

                                🎉 Selamat Ulang Tahun!

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        )}

    </div>
  );
}