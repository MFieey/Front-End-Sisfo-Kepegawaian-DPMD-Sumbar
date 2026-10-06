import api from "@/lib/axios";

export const getBerkala = async () => {
  const response =
    await api.get("/berkala");

  return response.data;
};

export const getBerkalaById =
  async (id: number) => {
    const response =
      await api.get(
        `/berkala/${id}`
      );

    return response.data;
  };

export const getBerkalaByPegawai = async (
      pegawaiId: number
  ) => {

      return api.get(
          `/berkala/pegawai/${pegawaiId}`
      );

  };

export const createBerkala =
  async (data: FormData) => {
    const response =
      await api.post(
        "/berkala",
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

export const updateBerkala =
  async (
    id: number,
    data: FormData
  ) => {
    const response =
      await api.put(
        `/berkala/${id}`,
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

export const deleteBerkala =
  async (id: number) => {
    const response =
      await api.delete(
        `/berkala/${id}`
      );

    return response.data;
  };