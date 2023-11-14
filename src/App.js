import "./App.css";
import Formulario from "./components/Formulario/Formulario";
import AltaFormulario from "./components/AltaFormulario/AltaFormulario";
import AdminPage from "./components/AdminPage/AdminPage";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/alta-formulario" element={<AltaFormulario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
