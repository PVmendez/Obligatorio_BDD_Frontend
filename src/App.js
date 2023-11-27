import "./App.css";
import Formulario from "./components/Formulario/Formulario";
import AdminPage from "./components/AdminPage/AdminPage";
import Login from "./components/Login/Login";
import Error404 from "./components/404/Error404";
import Actualizado from "./components/Actualizado/Actualizado";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./middleware/tokenVerification";
import { useEffect, useState } from "react";
import { getUserTable } from "./services/userServices";
import AltaFuncionario from "./components/AltaFuncionario/AltaFuncionario";
import Navbar from "./components/Navbar/Navbar";

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
  }, []);


  return (
    <div className="App">
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
          <Route
            path="/actualizado"
            element={
              isAuthenticated() ? <Actualizado /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        
      </BrowserRouter>
      <Navbar></Navbar>
    </div>
  );
}

export default App;
