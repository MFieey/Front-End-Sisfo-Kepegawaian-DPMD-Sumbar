import api from "@/lib/axios";

export const login = async (
  data: {
    username: string;
    password: string;
  }
) => {
  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;
};

export const logout =
  async () => {
    const response =
      await api.post(
        "/auth/logout"
      );

    return response.data;
  };

export const me =
  async () => {
    const response =
      await api.get(
        "/auth/me"
      );

    return response.data;
  };
  