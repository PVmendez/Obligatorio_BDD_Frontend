import React from "react";
import "./Navbar.css";
import { FiLogOut } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { getToken, removeToken } from "../../utils/api";

const Navbar = () => {
  const location = getToken();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("username");
    window.location.replace("http://localhost:3000/login");
  };

  return location ? (
    <div className="navbar">
      <a onClick={handleLogout} href="#">
        <FiLogOut />
      </a>
      <a href="/formulario">
        <LuFileSpreadsheet />
      </a>
      <a href="/">
        <RiAdminLine />
      </a>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
