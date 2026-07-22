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
        },

        {
            title: "Bidang",
            value: dashboard.totalBidang,
            icon: "🏢",
            color: "blue",
        },

        {
            title: "Berkala",
            value: dashboard.totalMonitoringBerkala,
            icon: "📅",
            color: "yellow",
        },

        {
            title: "Naik Pangkat",
            value: dashboard.totalMonitoringPangkat,
            icon: "📈",
            color: "red",
        },

    ];

    return (

        <div className="grid grid-cols-4 gap-6">

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
                    hover:-translate-y-2
                    hover:shadow-xl
                    transition-all
                    duration-300
                    "
                >

                    <div className="text-5xl">

                        {card.icon}

                    </div>

                    <h2
                        className="
                        text-4xl
                        font-bold
                        mt-5
                        text-gray-800
                        "
                    >

                        {card.value}

                    </h2>

                    <p
                        className="
                        mt-2
                        text-gray-500
                        font-medium
                        "
                    >

                        {card.title}

                    </p>

                </div>

            ))}

        </div>

    );

}