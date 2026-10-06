import api from "@/lib/axios";

export const getMonitoringPangkat = async (
  pegawaiId: number
) => {

  const response = await api.get(
    `/monitoring/pangkat/${pegawaiId}`
  );

  return response.data;

};

export const getMonitoringBerkala = async (
  pegawaiId: number
) => {

  const response = await api.get(
    `/monitoring/berkala/${pegawaiId}`
  );

  return response.data;

};