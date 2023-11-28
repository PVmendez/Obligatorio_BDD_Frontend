import React, { useEffect, useState } from "react";
import "./Login.css";
import { login } from "../../services/loginServices";
import { getUsers } from "../../services/userServices";
import Swal from "sweetalert2";
import { getPeriod } from "../../services/reservesServices";
import { convertDates } from "../../utils/convertDates";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [period, setPeriod] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const updatePeriod = await getPeriod();
        setPeriod(updatePeriod[0]);
        Swal.fire({
          icon: "warning",
          title: "Aviso",
          text: `Todos los funcionarios tienen la obligación de completar el formulario de actualizacion hasta el ${convertDates(
            updatePeriod[0].Fch_Fin
          )}`,
          confirmButtonText: "Entendido",
        });
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = async () => {
    try {
      await login(username, password);
      const users = await getUsers();

      const userFound = users.find((user) => {
        return user.logId ? user.LogId.toString() === username : false;
      });

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
