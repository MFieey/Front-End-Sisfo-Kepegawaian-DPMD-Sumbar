import api from "@/lib/axios";

export const getActivities = async () => {

    const response = await api.get("/activity");

    return response.data;

};