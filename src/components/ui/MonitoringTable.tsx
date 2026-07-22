type Props = {
  title: string;
  data: any[];
  tanggalField: string;
};

export default function MonitoringTable({
  title,
  data,
  tanggalField,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <div className="mb-4">

        <h2 className="text-xl font-bold">

            {title}

        </h2>

        <p className="text-sm text-gray-500 mt-1">

            Total : <b>{data.length}</b> Pegawai

        </p>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-3 text-left">
              Nama
            </th>

            <th className="p-3 text-left">
              NIP
            </th>

            <th className="p-3 text-left">
              Tanggal
            </th>

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={3}
                className="
                p-3
                text-center
                text-gray-500
                "
              >

                Tidak ada data

              </td>

            </tr>

          ) : (

            data.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">
                  {item.pegawai.nama}
                </td>

                <td className="p-3">
                  {item.pegawai.nip}
                </td>

                <td className="p-3">

                  {new Date(
                    item[tanggalField]
                  ).toLocaleDateString(
                    "id-ID"
                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}