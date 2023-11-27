import "./App.css";
import Formulario from "./components/Formulario/Formulario";
import AdminPage from "./components/AdminPage/AdminPage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Error404 from "./components/404/Error404";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./middleware/tokenVerification";
import { useEffect, useState } from "react";
import { getUserTable, sendMail } from "./services/userServices";
import AltaFuncionario from "./components/AltaFuncionario/AltaFuncionario";
import useAuth from "./hooks/useAuth";

const ROLES = {
  'User': 2001,
  'Admin': 5150
}

function App() {
  const [users, setUsers] = useState([]);

  const { setAuth, auth } = useAuth();

console.log(auth);

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

    const lastExecutionDate = localStorage.getItem('lastExecutionDate');
    const currentDate = new Date();

    const message1 = "Recurden que todos los funcionarios estan obligados a completar el formulario de actualizacion de datos";
    const message2 = "Recordar sacar fecha para renovar su carne de salud";

    if (!lastExecutionDate || isOneDayAgo(new Date(lastExecutionDate), currentDate)) {
      users.forEach((user) => {
        sendMail(user.Email, user.Actualizo === 0 ? message1 : message2)
      });
      localStorage.setItem('lastExecutionDate', currentDate.toString());
    }
  }, []);

  const isOneDayAgo = (lastDate, currentDate) => {
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    return currentDate - lastDate >= oneDayInMillis;
  };
  return (
    <div className="App">
      <Logout></Logout>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth auth={auth} allowedRoles={[ROLES.User]} />}>
              <Route path="/admin"
              element={AdminPage} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/formulario"
              element={
                isAuthenticated() ? <Formulario /> : <Navigate to="/login" />
              }
            />
            <Route element={<RequireAuth auth={auth} allowedRoles={[ROLES.User]} />}>
              <Route path="/alta-funcionario"
              element={AltaFuncionario} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
