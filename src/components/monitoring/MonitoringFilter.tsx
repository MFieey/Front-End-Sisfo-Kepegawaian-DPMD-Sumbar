type Props = {
    search: string;
    setSearch: (value: string) => void;

    statusFilter: string;
    setStatusFilter: (value: string) => void;

    children?: React.ReactNode;
};

export default function MonitoringFilter({

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    children,

}: Props){

    return(

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

            <div className="flex items-center gap-4">

                <div className="relative flex-1">

                    <span
                        className="
                        absolute
                        left-4
                        top-3
                        text-gray-400
                        "
                    >

                        🔍

                    </span>

                    <input

                        type="text"

                        placeholder="Cari data monitoring..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                        className="
                        w-full
                        border
                        rounded-xl
                        pl-12
                        pr-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-green-500
                        "

                    />

                </div>

                <select

                    value={statusFilter}

                    onChange={(e)=>

                        setStatusFilter(e.target.value)

                    }

                    className="
                    border
                    rounded-xl
                    px-4
                    py-3
                    "

                >

                    <option value="SEMUA">

                    📋 Semua

                    </option>

                    <option value="SUDAH">

                    🟢 Sudah

                    </option>

                    <option value="BELUM">

                    🟡 Belum

                    </option>

                </select>

                {children}

            </div>

        </div>

    );

}