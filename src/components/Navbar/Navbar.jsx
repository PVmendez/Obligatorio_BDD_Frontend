import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FiLogOut } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { getToken, removeToken } from "../../utils/api";
import { getUserTable, sendMail } from "../../services/userServices";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const [users, setUsers] = useState([]);
  const location = getToken();
  const auth = useSelector((state) => state.auth);

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
      "Recuerden que todos los funcionarios están obligados a completar el formulario de actualización de datos";
    const message2 = "Recordar sacar fecha para renovar su carne de salud";

    users.forEach((user) => {
      console.log(user)
      sendMail(user.Email, user.Actualizo === 0 ? message1 : message2);
    });
  };

  return location ? (
    <div className="sidebar">
      <div className="options">
        <a href="/formulario">
          <LuFileSpreadsheet />
          Ir a formulario
        </a>
        {auth.isAdmin ? (
          <a href="/">
            <RiAdminLine />
            Ir al AdminTable
          </a>
        ) : (
          ""
        )}
        {auth.isAdmin ? (
          <a onClick={handleSendMail} href="#">
            <FiMail />
            Enviar correos
          </a>
        ) : (
          ""
        )}
      </div>
      <a onClick={handleLogout} href="#">
        <FiLogOut />
        Cerrar sesión
      </a>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
