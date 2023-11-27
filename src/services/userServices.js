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
    await api.post("/employee", body);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const sendMail = async (destinatario, mensaje) => {
  const body = {
    destinatario,
    mensaje,
  };
  try {
    await api.post("/mail", body);
  } catch (error) {
    console.error("Error al enviar mail:", error);
    throw error;
  }
};

export const getUserUpdated = async (LogId) => {
  const body = { LogId };
  try {
    const users = await api.get("/employee-updated", body);
    return users.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};
