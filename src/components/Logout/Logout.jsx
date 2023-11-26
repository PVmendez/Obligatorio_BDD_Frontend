import React from "react";
import { getToken, removeToken } from "../../utils/api";

const Logout = () => {
  const location = getToken();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("username");
    window.location.replace("http://localhost:3000/login");
  };

  return <div>{location ? <button onClick={handleLogout}></button> : ""}</div>;
};

export default Logout;
