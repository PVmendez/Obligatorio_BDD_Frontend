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

export const getUserTable = async () => {
  try {
    const users = await api.get("/user-table");
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

export const postUser = async (body) => {
  try {
    await axios.post("http://localhost:8080/user", body);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const sendMail = async (destinatario) => {
  const body = {
    destinatario,
  };
  try {
    await api.post("/mail", body);
  } catch (error) {
    console.error("Error al enviar mail:", error);
    throw error;
  }
};
