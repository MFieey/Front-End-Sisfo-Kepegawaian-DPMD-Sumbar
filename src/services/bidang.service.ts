import api from "@/lib/axios";

export const getBidang = async () => {
  const response =
    await api.get("/bidang");

  return response.data;
};

export const getBidangById =
  async (id: number) => {
    const response =
      await api.get(
        `/bidang/${id}`
      );

    return response.data;
  };

export const createBidang =
  async (data: {
    nama: string;
  }) => {
    const response =
      await api.post(
        "/bidang",
        data
      );

    return response.data;
  };

export const updateBidang =
  async (
    id: number,
    data: {
      nama: string;
    }
  ) => {
    const response =
      await api.put(
        `/bidang/${id}`,
        data
      );

    return response.data;
  };

export const deleteBidang =
  async (id: number) => {
    const response =
      await api.delete(
        `/bidang/${id}`
      );

    return response.data;
  };