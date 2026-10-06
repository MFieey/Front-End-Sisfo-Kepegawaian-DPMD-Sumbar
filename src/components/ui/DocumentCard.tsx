type DocumentCardProps = {
    title: string;
    uploaded: boolean;
};

function DocumentCard({
    title,
    uploaded,
}: DocumentCardProps) {

    return (

        <div className="border border-gray-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-md transition-all">

            <div className="flex justify-between items-center mb-4">

                <h3 className="font-bold text-lg">

                    📄 {title}

                </h3>

                {

                    uploaded ?

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        ✅ Tersedia

                    </span>

                    :

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                        ❌ Belum Ada

                    </span>

                }

            </div>

            {

                uploaded ?

                <div className="space-y-3">

                    <p className="text-sm text-gray-500">

                        Dokumen telah diupload

                    </p>

                    <div className="flex gap-2 flex-wrap">

                        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">

                            👁 Lihat

                        </button>

                        <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">

                            ⬇ Download

                        </button>

                        <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600">

                            ✏ Ganti

                        </button>

                    </div>

                </div>

                :

                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">

                    📤 Upload Dokumen

                </button>

            }

        </div>

    );

}