import "./Actualizado.css";
import { getUser } from "../../services/userServices";
import { useEffect, useState } from "react";

function Actualizado() {
    const [user,setUser] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const userData = await getUser("1");
            setUser(userData);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsers();
      }, []);
    
    return(
        
        <div>
            <h2>Tus datos ya han sido actualizados {user.name || "No encontrado"} </h2>
        </div>
);      
}
export default Actualizado;
