import { api } from "../utils/api";

export const getUsers = async () => {
  try {
    const users = await api.get("/users");
    return users.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const createUser = async (body) => {
  try {
    await api.post("/users", body);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};