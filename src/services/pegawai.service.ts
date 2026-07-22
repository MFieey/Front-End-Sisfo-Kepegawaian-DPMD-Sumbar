import api from "@/lib/axios";

export const getPegawai = async () => {
  const response = await api.get("/pegawai");
  return response.data;
};

export const getPegawaiById = async (
  id: number
) => {
  const response = await api.get(
    `/pegawai/${id}`
  );

  return response.data;
};

export const createPegawai = async (data: FormData) => {
  const response = await api.post(
    "/pegawai",
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

export const updatePegawai = async (
  id: number,
  data: FormData
) => {
  const response =
    await api.put(
      `/pegawai/${id}`,
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

export const deletePegawai = async (
  id: number
) => {
  const response = await api.delete(
    `/pegawai/${id}`
  );

  return response.data;
};

export const exportPegawaiPdf = async () => {

    const response = await axios.get(
        "/export/pegawai/pdf",
        {
            responseType: "blob",
        }
    );

    const url =
        window.URL.createObjectURL(
            new Blob([response.data])
        );

    const link =
        document.createElement("a");

    link.href = url;

    link.setAttribute(
        "download",
        "Data_Pegawai.pdf"
    );

    document.body.appendChild(link);

    link.click();

};