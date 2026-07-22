export default function Table({
    children,
}:{
    children:React.ReactNode
}){

    return(

        <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        border
        border-gray-100
        overflow-hidden
        "
        >

            <table
            className="
            w-full
            border-separate
            border-spacing-0
            "
            >

                {children}

            </table>

        </div>

    );

}