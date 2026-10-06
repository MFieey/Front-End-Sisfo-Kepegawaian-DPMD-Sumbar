import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
    detailHref: string;
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

        </div>

    );

}