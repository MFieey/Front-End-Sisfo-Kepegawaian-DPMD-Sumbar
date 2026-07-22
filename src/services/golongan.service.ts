import api from "@/lib/axios";

export const getGolongan = async () => {
  const response =
    await api.get("/golongan");

  return response.data;
};

export const getGolonganById =
  async (id: number) => {
    const response =
      await api.get(
        `/golongan/${id}`
      );

    return response.data;
  };

export const createGolongan =
  async (data: {
    nama: string;
  }) => {
    const response =
      await api.post(
        "/golongan",
        data
      );

    return response.data;
  };

export const updateGolongan =
  async (
    id: number,
    data: {
      nama: string;
    }
  ) => {
    const response =
      await api.put(
        `/golongan/${id}`,
        data
      );

    return response.data;
  };

export const deleteGolongan =
  async (id: number) => {
    const response =
      await api.delete(
        `/golongan/${id}`
      );

    return response.data;
  };