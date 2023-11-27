import "./Actualizado.css";
import { getUser, getUserUpdated } from "../../services/userServices";
import { useEffect, useState } from "react";

function Actualizado() {
    const [user,setUser] = useState([]);
    const storedUsername = localStorage.getItem("username");
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const userData = await getUserUpdated(storedUsername);
            setUser(userData);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsers();
      }, []);
    
    return(
        
        <div>
            <h2>Tus datos ya han sido actualizados {storedUsername || ""} </h2>
        </div>
);      
}
export default Actualizado;
