import Link from "next/link";
import { Pencil, KeyRound, Trash2 } from "lucide-react";

type Props = {
    editHref: string;
    resetHref: string;
    onDelete: () => void;
    disabled?: boolean;
};

export default function UserActionButtons({
    editHref,
    resetHref,
    onDelete,
    disabled = false,
}: Props) {

    return (

        <div className="flex justify-center gap-2 flex-wrap">

            <Link
                href={editHref}
                className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    bg-amber-500
                    hover:bg-amber-600
                    text-white
                    transition
                "
            >
                <Pencil size={18}/>
                <span>Edit</span>
            </Link>

            <Link
                href={resetHref}
                className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    transition
                "
            >
                <KeyRound size={18}/>
                <span>Reset</span>
            </Link>

            <button
                disabled={disabled}
                onClick={onDelete}
                className={`
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    text-white
                    transition

                    ${
                        disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }
                `}
            >
                <Trash2 size={18}/>
                <span>Hapus</span>
            </button>

        </div>

    );

}