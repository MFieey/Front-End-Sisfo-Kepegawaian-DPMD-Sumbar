import api from "@/lib/axios";

export const getKenaikanPangkat = async () => {
  const response =
    await api.get("/kenaikan-pangkat");

  return response.data;
};

export const getKenaikanPangkatById =
  async (id: number) => {
    const response =
      await api.get(
        `/kenaikan-pangkat/${id}`
      );

    return response.data;
  };

export const getPangkatByPegawai = async (
      pegawaiId: number
  ) => {

      return api.get(
          `/kenaikan-pangkat/pegawai/${pegawaiId}`
      );

  };

export const createKenaikanPangkat =
  async (data: FormData) => {
    const response =
      await api.post(
        "/kenaikan-pangkat",
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

export const updateKenaikanPangkat =
  async (
    id: number,
    data: FormData
  ) => {
    const response =
      await api.put(
        `/kenaikan-pangkat/${id}`,
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

export const deleteKenaikanPangkat =
  async (id: number) => {
    const response =
      await api.delete(
        `/kenaikan-pangkat/${id}`
      );

    return response.data;
  };