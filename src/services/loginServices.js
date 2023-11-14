import { api, setToken } from "../utils/api";

export const login = async (logId, password) => {
  try {
    const response = await api.post("/login", {
      logId,
      password,
    });
    const { token } = response.data;
    setToken(token);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
