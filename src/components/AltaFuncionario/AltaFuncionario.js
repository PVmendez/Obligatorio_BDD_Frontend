import React, { useState } from 'react';
import './AltaFuncionario.css';

function AltaFuncionario() {
  const [domicilio, setDomicilio] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // Otros campos y estados necesarios

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar las validaciones necesarias
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <h2>Alta de Funcionario</h2>
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
          Domicilio:
          <input type="text" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
        </label>
        <label>
          Correo Electronico:
          <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <label>
          Teléfono:
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
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

export default AltaFuncionario;
