import "./App.css";
import Formulario from "./components/Formulario/Formulario";
<<<<<<< HEAD
import AltaFormulario from "./components/AltaFormulario/AltaFormulario";
import Actualizado from "./components/Actualizado/Actualizado";
=======
>>>>>>> feca64a59c35c2a743b59a0049002968e4a4f1aa
import AdminPage from "./components/AdminPage/AdminPage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Error404 from "./components/404/Error404";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./middleware/tokenVerification";
import { useEffect, useState } from "react";
import { getUserTable, sendMail } from "./services/userServices";
import AltaFuncionario from "./components/AltaFuncionario/AltaFuncionario";

function App() {
  const [users, setUsers] = useState([]);

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <AdminPage users={users} /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/formulario"
            element={
              isAuthenticated() ? <Formulario /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/alta-funcionario"
            element={
              isAuthenticated() ? <AltaFuncionario /> : <Navigate to="/login" />
            }
          />
<<<<<<< HEAD
          <Route
            path="/actualizado"
            element={
              isAuthenticated() ? <Actualizado /> : <Navigate to="/" />
            }
          />
=======
          <Route path="*" element={<Error404 />} />
>>>>>>> feca64a59c35c2a743b59a0049002968e4a4f1aa
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
