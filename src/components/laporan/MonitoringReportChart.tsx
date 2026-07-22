type Props = {

    title: string;

    sudah: number;

    belum: number;

};

export default function MonitoringReportChart({

    title,

    sudah,

    belum,

}: Props) {

    const total = sudah + belum;

    const sudahPersen =

        total === 0

            ? 0

            : Math.round(

                sudah / total * 100

            );

    const belumPersen =

        total === 0

            ? 0

            : Math.round(

                belum / total * 100

            );

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow
            p-6
            "
        >

            <h2 className="text-xl font-bold mb-6">

                {title}

            </h2>

            {/* Sudah */}

            <div className="mb-5">

                <div className="flex justify-between mb-2">

                    <span>

                        🟢 Sudah

                    </span>

                    <span>

                        {sudah} Pegawai

                    </span>

                </div>

                <div
                    className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-3
                    "
                >

                    <div

                        className="
                        bg-green-600
                        h-3
                        rounded-full
                        "

                        style={{

                            width:`${sudahPersen}%`

                        }}

                    />

                </div>

            </div>

            {/* Belum */}

            <div>

                <div className="flex justify-between mb-2">

                    <span>

                        🟡 Belum

                    </span>

                    <span>

                        {belum} Pegawai

                    </span>

                </div>

                <div
                    className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-3
                    "
                >

                    <div

                        className="
                        bg-yellow-500
                        h-3
                        rounded-full
                        "

                        style={{

                            width:`${belumPersen}%`

                        }}

                    />

                </div>

            </div>

        </div>

    );

}