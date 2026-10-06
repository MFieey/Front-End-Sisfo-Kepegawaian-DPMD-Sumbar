import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
    detailHref?: string;
    editHref: string;
    onDelete: () => void;
};

export default function ActionButtons({
    detailHref,
    editHref,
    onDelete,
}: Props) {
    return (
        <div className="flex justify-center gap-2">

            {/* Tombol Detail hanya tampil jika ada detailHref */}
            {detailHref && (
                <Link
                    href={detailHref}
                    className="
                        flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-lg
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        transition
                    "
                >
                    <Eye size={18} />
                    <span>Detail</span>
                </Link>
            )}

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
                <Pencil size={18} />
                <span>Edit</span>
            </Link>

            <button
                onClick={onDelete}
                className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    transition
                "
            >
                <Trash2 size={18} />
                <span>Hapus</span>
            </button>

        </div>
    );
}