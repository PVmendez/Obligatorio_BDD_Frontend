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
import { useDispatch, useSelector } from "react-redux";
import { verifiedRoles } from "./reducers/authSlice";
import { getUser } from "./services/loginServices";
import { wasUpdated } from "./middleware/wasUpdated";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname !== "/login") {
      const storedUsername = localStorage.getItem("username");
      setLoading(true); // Inicia el estado de carga

      getUser(storedUsername)
        .then((data) => {
          const roles = JSON.parse(data.Roles);
          dispatch(verifiedRoles({ roles }));
        })
        .finally(() => {
          setLoading(false); // Finaliza el estado de carga
        });
    } else {
      setLoading(false); // Si estás en la página de inicio de sesión, finaliza el estado de carga
    }

    const fetchUsers = async () => {
      try {
        const userData = await getUserTable();
        setUsers(userData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const shouldShowNavbar = () => {
    const currentPath = window.location.pathname;
    return currentPath !== "/login" && currentPath !== "/register";
  };

  return (
    <div className="App">
      <BrowserRouter>
        {shouldShowNavbar() && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() && auth.isAdmin ? (
                <AdminPage users={users} />
              ) : (
                <Navigate to="/404" />
              )
            }
          />
          <Route
            path="/formulario"
            element={
              isAuthenticated() ? <Formulario /> : <Navigate to="/404" />
            }
          />
          <Route
            path="/alta-funcionario"
            element={
              isAuthenticated() ? <AltaFuncionario /> : <Navigate to="/404" />
            }
          />
          <Route
            path="/actualizado"
            element={isAuthenticated() && wasUpdated() ? <Actualizado /> : <Navigate to="/404" />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
