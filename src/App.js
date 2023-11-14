import "./App.css";
import Formulario from "./components/Formulario/Formulario";
import AltaFormulario from "./components/AltaFormulario/AltaFormulario";
import AdminPage from "./components/AdminPage/AdminPage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./middleware/tokenVerification";

function App() {
  return (
    <div className="App">
      <Logout></Logout>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/formulario"
            element={
              isAuthenticated() ? <Formulario /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/alta-formulario"
            element={
              isAuthenticated() ? <AltaFormulario /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
