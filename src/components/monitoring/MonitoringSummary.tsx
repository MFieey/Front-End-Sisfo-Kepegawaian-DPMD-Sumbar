type Props = {

    title:string;

    total:number;

    sudah:number;

    belum:number;

    color:string;

    icon:string;

};

export default function MonitoringSummary({

    title,

    total,

    sudah,

    belum,

    color,

    icon,

}:Props){

    const progress =

        total===0

        ?

        0

        :

        Math.round(

            (sudah/total)*100

        );

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

                        🟢 Sudah

                    </span>

                    <span
                    className="
                    font-bold
                    text-green-700
                    "
                    >

                        {sudah} Pegawai

                    </span>

                </div>

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

            </div>

            <div className="mt-6">

                <p
                    className="
                    text-sm
                    font-semibold
                    text-gray-600
                    mb-2
                    ">

                    Progress Monitoring

                    </p>

                    <div
                    className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-3
                    ">

                    <div

                    className="
                    bg-green-600
                    h-3
                    rounded-full
                    transition-all
                    "

                    style={{

                    width:`${progress}%`

                    }}

                    >

                    </div>

                    </div>

                    <p
                    className="
                    text-right
                    text-sm
                    mt-2
                    text-gray-500
                    ">

                    {progress}%

                    </p>

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