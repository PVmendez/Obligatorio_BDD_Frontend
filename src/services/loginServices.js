import { api, setToken } from "../utils/api";

export const login = async (logId, password) => {
  try {
    
    console.log(password,logId);
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

export const getLogins = async () => {
  try {
    const users = await api.get("/login");
    return users.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const body = {
      username,
      password,
    };
    await api.post("/register", body);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};
