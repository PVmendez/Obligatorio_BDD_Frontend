import React, { useState } from "react";
import "./Register.css";
import { getLogins, register } from "../../services/loginServices";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const users = await getLogins();
    const userFound = users.find((user) => {
      return user.LogId && user.LogId.toString() === username;
    });
    if (userFound) {
      setError("Ya existe un usuario con ese nombre.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== secondPassword) {
      setError("Las contraseñas tienen que coincidir.");
      return;
    }
    await register(username, password);
    window.location.replace("http://localhost:3000/login");
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
        <label>
          Confirmar contraseña:
          <input
            className="input"
            type="password"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />
        </label>
        <button className="button" type="button" onClick={handleRegister}>
          Registrarse
        </button>
        <a
          href="/login"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
            color: "#008AFF",
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión.
        </a>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default Register;
