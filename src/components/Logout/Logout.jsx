import React from "react";
import { getToken, removeToken } from "../../utils/api";

const Logout = () => {
  const location = getToken();

  const handleLogout = () => {
    removeToken();
    window.location.replace("http://localhost:3000/login");
  };

  const buttonStyle = {
    background: "#DC3545",
    margin: "5px",
    padding: "2px",
    border: "1px solid black",
    position: "absolute"
  };

  return (
    <div>
      {location ? (
        <button style={buttonStyle} onClick={handleLogout}>
          Cerrar sesión
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Logout;
