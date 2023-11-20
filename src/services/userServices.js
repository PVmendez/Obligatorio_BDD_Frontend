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

<<<<<<< HEAD
export const getUser = async (ci) => {
  try {
    const body = {"Ci":ci}
    const user = await api.get("/user",body);
    return user.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
=======
export const getUserTable = async () => {
  try {
    const users = await api.get("/user-table");
    return users.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
>>>>>>> feca64a59c35c2a743b59a0049002968e4a4f1aa
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

export const sendMail = async (destinatario) => {
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
