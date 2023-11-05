import './App.css';
import Formulario from './components/Formulario/Formulario';
import AltaFormulario from './components/AltaFormulario/AltaFormulario';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/formulario" element={<Formulario/>} />
          <Route path="/altaFormulario" element={<AltaFormulario/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
