import axios from "axios";

export const getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8080/users");
      console.log('Datos de usuarios:', users.data.data);
      return users.data.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  };
