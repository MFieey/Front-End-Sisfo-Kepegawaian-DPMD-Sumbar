type Props = {

    title: string;

    data: any[];

    tanggalField: string;

    color: string;

};

export default function MonitoringTable({

    title,

    data,

    tanggalField,

    color,

}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow p-5">

            <div className="mb-4">

                <h2
                    className={`text-xl font-bold ${color}`}
                >

                    {title}

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    {

                        data.length === 0

                        ?

                        "Belum ada pegawai."

                        :

                        `Total : ${data.length} Pegawai`

                    }

                </p>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-2">

                            Nama

                        </th>

                        <th className="text-left py-2">

                            NIP

                        </th>

                        <th className="text-left py-2">

                            Tanggal

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.length === 0

                        ?

                        <tr>

                            <td
                                colSpan={3}
                                className="text-center py-5 text-gray-500"
                            >

                                Tidak ada data

                            </td>

                        </tr>

                        :

                        data.map((item)=>(

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="py-2">

                                    {item.pegawai.nama}

                                </td>

                                <td>

                                    {item.pegawai.nip}

                                </td>

                                <td>

                                    {

                                        new Date(
                                            item[tanggalField]
                                        ).toLocaleDateString("id-ID")

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}