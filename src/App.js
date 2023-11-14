import './App.css';
import Formulario from './components/Formulario/Formulario';
import AltaFuncionario from './components/AltaFuncionario/AltaFuncionario';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/formulario" element={<Formulario/>} />
          <Route path="/altaFuncionario" element={<AltaFuncionario/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
