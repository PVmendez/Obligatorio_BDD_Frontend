import React, { useState } from "react";
import "./Login.css";
import { login } from "../../services/loginServices";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (response) {
        localStorage.setItem("username", response.username);
        window.location.replace("http://localhost:3000/formulario");
        setError("");
      }
    } catch (error) {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

  const errorStyle = {
    color: "red",
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  };

  return (
    <div className="container">
      <form>
        <label>
          Usuario:
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="button" type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default Login;
