import React, { useState } from 'react';
import './AltaFormulario.css';

function AltaFuncionario() {
  const [domicilio, setDomicilio] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  // Otros campos y estados necesarios

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar las validaciones necesarias
  };

  return (
    <div>
      <h2>Alta de Funcionario</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Otros campos del formulario */}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default AltaFuncionario;
