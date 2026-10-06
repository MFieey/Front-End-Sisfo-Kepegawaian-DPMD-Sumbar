import api from "@/lib/axios";

export const getDokumenPegawai = async (
    pegawaiId: string | number
) => {

    const response = await api.get(
        `/dokumen/pegawai/${pegawaiId}`
    );

    return response.data;

};

export const uploadDokumen = async (
    data: FormData
) => {

    const response = await api.post(
        "/dokumen",
        data,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data;

};

export const updateDokumen = async (
    id: number,
    data: FormData
) => {

    const response = await api.put(
        `/dokumen/${id}`,
        data,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data;

};

export const deleteDokumen = async (
    id: number
) => {

    const response = await api.delete(
        `/dokumen/${id}`
    );

    return response.data;

};