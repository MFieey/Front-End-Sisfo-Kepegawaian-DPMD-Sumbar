type Props = {
    title?: string;
    children: React.ReactNode;
};

export default function Card({
    title,
    children,
}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            {title && (

                <h2 className="text-2xl font-bold mb-5">

                    {title}

                </h2>

            )}

            {children}

        </div>

    );

}