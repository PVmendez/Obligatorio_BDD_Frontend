import axios from "axios";

export const getUsers = async () => {
  try {
    const users = await axios.get("http://localhost:8080/users");
    return users.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const createUser = async (body) => {
  try {
    await axios.post("http://localhost:8080/users", body);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};