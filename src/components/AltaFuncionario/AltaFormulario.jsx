import React, { useEffect, useState } from "react";
import "./AltaFormulario.css";
import Swal from "sweetalert2";

function AltaFuncionario() {
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [comprobante, setComprobante] = useState("");

  const campos = [
    { label: "CI", state: ci, setState: setCi, type: "text" },
    {
      label: "Nombre Completo",
      state: nombre,
      setState: setNombre,
      type: "text",
    },
    {
      label: "Fecha de Nacimiento",
      state: fechaNacimiento,
      setState: setFechaNacimiento,
      type: "text",
    },
    {
      label: "Domicilio",
      state: domicilio,
      setState: setDomicilio,
      type: "text",
    },
    {
      label: "Correo Electronico",
      state: correo,
      setState: setCorreo,
      type: "text",
    },
    { label: "Teléfono", state: telefono, setState: setTelefono, type: "text" },
    {
      label: "Carné de Salud",
      state: isChecked,
      setState: setIsChecked,
      type: "checkbox",
    },
    {
      label: "Fecha de Vencimiento",
      state: fechaVencimiento,
      setState: setFechaVencimiento,
      type: "date",
    },
    {
      label: "Comprobante",
      state: comprobante,
      setState: setComprobante,
      type: "file",
    },
  ];

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const mostrarModal = async () => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Tu cedula no se encuentra registrada",
      confirmButtonText: "Registrate",
    });
  };

  useEffect(() => {
    mostrarModal();
  }, []);

  return (
    <div>
      <h2>Alta de Funcionario</h2>
      <form onSubmit={handleSubmit}>
        {campos
          .filter(
            (campo) =>
              campo.label !== "Fecha de Vencimiento" &&
              campo.label !== "Comprobante"
          )
          .map((campo, index) => (
            <label key={index}>
              {campo.label}:
              {campo.type === "checkbox" ? (
                <input
                  type={campo.type}
                  checked={campo.state}
                  onChange={handleToggle}
                />
              ) : (
                <input
                  type={campo.type}
                  value={campo.state}
                  onChange={(e) => campo.setState(e.target.value)}
                />
              )}
            </label>
          ))}
        {isChecked && (
          <div>
            {campos
              .filter(
                (campo) =>
                  campo.label === "Fecha de Vencimiento" ||
                  campo.label === "Comprobante"
              )
              .map((campo, index) => (
                <label key={index}>
                  {campo.label}:
                  <input
                    type={campo.type}
                    value={campo.state}
                    onChange={(e) => campo.setState(e.target.value)}
                  />
                </label>
              ))}
          </div>
        )}
        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default AltaFuncionario;
