import React, { useState } from "react";
import "./Login.css";
import { login } from "../../services/loginServices";
import { getUsers } from "../../services/userServices";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      console.log('primero');
      await login(username, password);
      console.log('segundo');
      const users = await getUsers();
      console.log('tercero');
      
      const userFound = users.find((user) => {
        return user.LogId.toString() === username;
      });

      console.log(userFound);

      if (userFound && userFound.Actualizo === 1)
        window.location.replace("http://localhost:3000/404");
      else {
        localStorage.setItem("username", username);
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
        <a
          href="/register"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
            color: "#008AFF",
          }}
        >
          ¿No tienes cuenta? Crea una aquí.
        </a>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default Login;
