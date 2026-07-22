import api from "@/lib/axios";

export const getJabatan = async () => {
  const response = await api.get("/jabatan");
  return response.data;
};

export const getJabatanById = async (
  id: number
) => {
  const response =
    await api.get(`/jabatan/${id}`);

  return response.data;
};

export const createJabatan = async (
  data: { nama: string }
) => {
  const response =
    await api.post("/jabatan", data);

  return response.data;
};

export const updateJabatan = async (
  id: number,
  data: { nama: string }
) => {
  const response =
    await api.put(
      `/jabatan/${id}`,
      data
    );

  return response.data;
};

export const deleteJabatan = async (
  id: number
) => {
  const response =
    await api.delete(
      `/jabatan/${id}`
    );

  return response.data;
};