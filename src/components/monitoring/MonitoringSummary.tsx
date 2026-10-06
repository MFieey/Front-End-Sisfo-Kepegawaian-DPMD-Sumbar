type Props = {

    title:string;

    total:number;

    proses:number;

    belum:number;

    color:string;

    icon:string;

    selesai:string;

    tidakNaik:string;

};

export default function MonitoringSummary({

    title,

    total,

    proses,

    belum,

    color,

    icon,
    
    selesai,

    tidakNaik,

}:Props){

    return(

        <div
        className="
        bg-white
        rounded-2xl
        shadow
        p-6
        mb-6
        ">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm uppercase tracking-wide">

                        {title}

                    </p>

                    <h2
                        className={`
                        text-5xl
                        font-bold
                        mt-2
                        ${color}
                        `}
                        >

                        {total}

                        <span className="text-xl text-gray-500 ml-2">

                            Pegawai

                        </span>

                        </h2>

                </div>

                <div className="text-6xl">

                    {icon}

                </div>

            </div>

            <div className="mt-6">

                <div className="flex justify-between items-center">

                    <span>

                        🟡 Belum

                    </span>

                    <span
                    className="
                    font-bold
                    text-yellow-700
                    "
                    >

                        {belum} Pegawai

                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span>

                        🔵 Proses

                    </span>

                    <span
                    className="
                    font-bold
                    text-blue-700
                    "
                    >

                        {proses} Pegawai

                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span>

                        🟢 Selesai

                    </span>

                    <span
                    className="
                    font-bold
                    text-green-700
                    "
                    >

                        {selesai} Pegawai

                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span>

                        🔴 Tidak Naik

                    </span>

                    <span
                    className="
                    font-bold
                    text-red-600
                    "
                    >

                        {tidakNaik} Pegawai

                    </span>

                </div>

            </div>

            <div
                className="
                mt-6
                pt-4
                border-t
                text-sm
                text-gray-500
                flex
                justify-between
                ">

                <span>

                Monitoring Aktif

                </span>

                <span>

                Hari Ini

                </span>

            </div>

        </div>

    );

}