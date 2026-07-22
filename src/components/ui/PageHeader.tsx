type Props = {

    title: string;

    subtitle: string;

    icon: string;

    children?: React.ReactNode;

};

export default function PageHeader({

    title,

    subtitle,

    icon,

    children,

}: Props){

    return(

        <div
        className="
        bg-white
        rounded-2xl
        shadow
        p-6
        mb-6
        flex
        justify-between
        items-center
        "
        >

            <div
            className="
            flex
            items-center
            gap-5
            "
            >

                <div
                className="
                w-16
                h-16
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
                text-3xl
                "
                >

                    {icon}

                </div>

                <div>

                    <h1
                    className="
                    text-3xl
                    font-bold
                    text-green-700
                    "
                    >

                        {title}

                    </h1>

                    <p
                    className="
                    text-gray-500
                    mt-1
                    "
                    >

                        {subtitle}

                    </p>

                </div>

            </div>

            <div>

                {children}

            </div>

        </div>

    );

}