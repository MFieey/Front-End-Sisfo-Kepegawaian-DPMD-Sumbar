import StatCard from "../ui/StatCard";

type Props = {
    dashboard: any;
};

export default function DashboardCards({
    dashboard,
}: Props) {

    const cards = [
        {
            title: "Total Pegawai",
            value: dashboard.totalPegawai,
            icon: "👥",
            color: "green",
            description: "Data pegawai aktif",
        },
        {
            title: "Bidang",
            value: dashboard.totalBidang,
            icon: "🏢",
            color: "blue",
            description: "Unit kerja yang terdaftar",
        },
        {
            title: "Berkala",
            value: dashboard.totalMonitoringBerkala,
            icon: "📅",
            color: "yellow",
            description: "Monitoring kenaikan gaji berkala",
        },
        {
            title: "Naik Pangkat",
            value: dashboard.totalMonitoringPangkat,
            icon: "📈",
            color: "red",
            description: "Monitoring kenaikan pangkat",
        },
    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="
                    bg-white
                    rounded-2xl
                    shadow
                    border
                    border-gray-100
                    p-6
                    hover:-translate-y-1
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className={`
                            w-14
                            h-14
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-3xl
                            ${
                                card.color === "green"
                                    ? "bg-green-100 text-green-600"
                                    : card.color === "blue"
                                    ? "bg-blue-100 text-blue-600"
                                    : card.color === "yellow"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-red-100 text-red-600"
                            }
                            `}
                        >

                            {card.icon}

                        </div>

                        <div>

                            <h2 className="font-semibold text-gray-800">

                                {card.title}

                            </h2>

                            <p className="text-xs text-gray-500">

                                {card.description}

                            </p>

                        </div>

                    </div>

                    <h1
                        className="
                        text-5xl
                        font-bold
                        mt-6
                        text-gray-800
                        "
                    >

                        {card.value}

                    </h1>

                    <div className="border-t border-gray-100 mt-5 pt-3">

                        <p className="text-xs text-gray-400">

                            Data Sistem

                        </p>

                    </div>

                </div>

            ))}

        </div>

    );

}