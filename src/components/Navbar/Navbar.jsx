import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FiLogOut } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { getToken, removeToken } from "../../utils/api";
import { FiMail } from "react-icons/fi";
import { getUserTable, sendMail } from "../../services/userServices";

const Navbar = () => {
  const [users, setUsers] = useState([]);
  const location = getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUserTable();
        setUsers(userData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("username");
    window.location.replace("http://localhost:3000/login");
  };

  const handleSendMail = () => {
    const message1 =
      "Recurden que todos los funcionarios estan obligados a completar el formulario de actualizacion de datos";
    const message2 = "Recordar sacar fecha para renovar su carne de salud";

    users.forEach((user) => {
      sendMail(user.Email, user.Actualizo === 0 ? message1 : message2);
    });
  };

  return location ? (
    <div className="navbar">
      <a onClick={handleLogout} href="#">
        Cerrar sesión
        <FiLogOut />
      </a>
      <a href="/formulario">
        Ir a formulario
        <LuFileSpreadsheet />
      </a>
      <a href="/">
        Ir al AdminTable
        <RiAdminLine />
      </a>
      <a onClick={handleSendMail} href="#">
        Enviar correos
        <FiMail />
      </a>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
