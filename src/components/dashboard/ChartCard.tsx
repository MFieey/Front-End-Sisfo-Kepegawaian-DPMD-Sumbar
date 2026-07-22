type Props = {
    title: string;
    children: React.ReactNode;
};

export default function ChartCard({
    title,
    children,
}: Props){

    return(

        <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
            border
            border-gray-100
            hover:shadow-xl
            transition-all
            duration-300
            "
        >

            <div
                className="
                bg-gradient-to-r
                from-green-600
                to-emerald-500
                text-white
                px-6
                py-4
                flex
                items-center
                gap-3
                "
            >

                <span className="text-2xl">

                    📊

                </span>

                <div>

                    <h2 className="font-bold text-lg">

                        {title}

                    </h2>

                    <p className="text-green-100 text-sm">

                        Statistik Kepegawaian

                    </p>

                </div>

            </div>

            <div className="p-6">

                {children}

            </div>

        </div>

    );

}