import api from "@/lib/axios";

export const getPendidikan = async () => {
  const response =
    await api.get("/pendidikan");

  return response.data;
};

export const getPendidikanById =
  async (id: number) => {
    const response =
      await api.get(
        `/pendidikan/${id}`
      );

    return response.data;
  };

export const createPendidikan =
  async (data: {
    nama: string;
  }) => {
    const response =
      await api.post(
        "/pendidikan",
        data
      );

    return response.data;
  };

export const updatePendidikan =
  async (
    id: number,
    data: {
      nama: string;
    }
  ) => {
    const response =
      await api.put(
        `/pendidikan/${id}`,
        data
      );

    return response.data;
  };

export const deletePendidikan =
  async (id: number) => {
    const response =
      await api.delete(
        `/pendidikan/${id}`
      );

    return response.data;
  };