import Link from "next/link";

type Props = {
    editHref: string;
    onDelete: () => void;
};

export default function ActionButtons({
    editHref,
    onDelete,
}: Props) {

    return (

        <div className="flex justify-center gap-2">

            <Link
                href={editHref}
                className="
                px-3
                py-2
                rounded-lg
                bg-amber-500
                hover:bg-amber-600
                text-white
                text-sm
                transition
                "
            >
                ✏ Edit
            </Link>

            <button
                onClick={onDelete}
                className="
                px-3
                py-2
                rounded-lg
                bg-red-600
                hover:bg-red-700
                text-white
                text-sm
                transition
                "
            >
                🗑 Hapus
            </button>

        </div>

    );

}