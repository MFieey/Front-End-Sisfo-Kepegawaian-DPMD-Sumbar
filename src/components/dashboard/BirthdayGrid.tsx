type Props = {
  data: any[];
};

export default function BirthdayGrid({
  data,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold mb-5">
        Ulang Tahun Bulan Ini 🎂
      </h2>

      {data.length === 0 ? (

        <p className="text-gray-500">
          Tidak ada pegawai yang berulang tahun bulan ini.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {data.map((item: any) => (

            <div
              key={item.id}
              className="
                border
                rounded-xl
                p-4
                flex
                items-center
                gap-4
              "
            >

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
                "
              />

              <div>

                <h3 className="font-bold">
                  {item.nama}
                </h3>

                <p className="text-sm text-gray-500">
                  Umur {item.umur} Tahun
                </p>

                <p className="text-sm text-gray-500">
                  Tanggal {item.hariUlangTahun}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}