import React, { useState } from "react";
import "./Formulario.css";

function Formulario() {
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar las validaciones necesarias
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <h2>Formulario de Actualización de Datos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          CI:
          <input
            type="text"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
          />
        </label>
        <label>
          Nombre Completo:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </label>
        <label>
           Carné de Salud:
          <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        </label>

        {isChecked ? (
          <div>
            {" "}
            <label>
              Fecha de Vencimiento:
              <input
                type="date"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </label>
            <label>
              Comprobante:
              <input
                type="file"
                value={comprobante}
                onChange={(e) => setComprobante(e.target.value)}
              />
            </label>
          </div>
        ) : ''}
        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
