type Props={

    totalPegawai:number;

    totalBerkala:number;

    totalPangkat:number;

    totalSudah:number;

    totalBelum:number;

};

export default function MonitoringReportSummary({

    totalPegawai,

    totalBerkala,

    totalPangkat,

    totalSudah,

    totalBelum,

}:Props){

    const cards=[

        {

            icon:"👥",

            title:"Total Pegawai",

            value:totalPegawai,

            color:"text-purple-700",

        },

        {

            icon:"📅",

            title:"Monitoring Berkala",

            value:totalBerkala,

            color:"text-yellow-600",

        },

        {

            icon:"📈",

            title:"Monitoring Pangkat",

            value:totalPangkat,

            color:"text-red-600",

        },

        {

            icon:"🟢",

            title:"Sudah",

            value:totalSudah,

            color:"text-green-600",

        },

        {

            icon:"🟡",

            title:"Belum",

            value:totalBelum,

            color:"text-orange-600",

        },

    ];

    return(

        <div className="grid grid-cols-5 gap-5 mb-6">

            {

                cards.map((card)=>(

                    <div

                        key={card.title}

                        className="bg-white rounded-2xl shadow p-5"

                    >

                        <div className="text-4xl">

                            {card.icon}

                        </div>

                        <h2

                            className={`text-4xl font-bold mt-4 ${card.color}`}

                        >

                            {card.value}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            {card.title}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}