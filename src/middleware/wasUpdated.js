import { getUserUpdated } from "../services/userServices";

export const wasUpdated = async () => {
    const storedUsername = localStorage.getItem("username");
    const { Actualizo } = await getUserUpdated(storedUsername);
    console.log(Actualizo)
    return Actualizo === 1;
}