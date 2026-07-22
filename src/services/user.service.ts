import api from "@/lib/axios";

export const getUsers =
  async () => {
    const response =
      await api.get("/user");

    return response.data;
  };

export const getUser =
  async (id: number) => {
    const response =
      await api.get(
        `/user/${id}`
      );

    return response.data;
  };

export const createUser =
  async (data: any) => {
    const response =
      await api.post(
        "/user",
        data
      );

    return response.data;
  };

export const updateUser =
  async (
    id: number,
    data: any
  ) => {
    const response =
      await api.put(
        `/user/${id}`,
        data
      );

    return response.data;
  };

  export const updatePassword =
    async (
      id: number,
      password: string
    ) => {

      const response =
        await api.put(
          `/user/${id}/password`,
          {
            password,
          }
        );

      return response.data;
  };

export const deleteUser =
  async (id: number) => {
    const response =
      await api.delete(
        `/user/${id}`
      );

    return response.data;
  };