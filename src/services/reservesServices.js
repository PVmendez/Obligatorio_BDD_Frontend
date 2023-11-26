import { api } from "../utils/api";

export const getReserves = async () => {
  try {
    const reserves = await api.get("/reserves");
    return reserves.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const createReserve = async (body) => {
  try {
    await api.post("/reserves", body);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};
