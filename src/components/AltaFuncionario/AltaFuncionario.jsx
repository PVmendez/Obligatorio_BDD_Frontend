import React, { useEffect, useState } from "react";
import "./AltaFuncionario.css";
import Swal from "sweetalert2";
import { postUser } from "../../services/userServices";

function AltaFuncionario() {
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [fechaEmision, setFechaEmision] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [comprobante, setComprobante] = useState("");

  const campos = [
    { label: "CI", state: ci, setState: setCi, type: "text" },
    {
      label: "Nombre",
      state: nombre,
      setState: setNombre,
      type: "text",
    },
    {
      label: "Apellido",
      state: apellido,
      setState: setApellido,
      type: "text",
    },
    {
      label: "Fecha de Nacimiento",
      state: fechaNacimiento,
      setState: setFechaNacimiento,
      type: "date",
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
      label: "Fecha de Emision",
      state: fechaEmision,
      setState: setFechaEmision,
      type: "date",
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
    const birthDateFormated = new Date(fechaNacimiento);
    const expirationDateFormated = new Date(fechaVencimiento);
    const issueDateFormated = new Date(fechaEmision);
    const body = {
      'Ci': ci,
      'Name': nombre,
      'Surname': apellido,
      'Birthdate': birthDateFormated,
      'Location': domicilio,
      'Mail': correo,
      'Phone': telefono,
      'ItHas': isChecked,
      'IssueDate': issueDateFormated,
      'ExpirationDate': expirationDateFormated,
      'Receipt': comprobante 
    };
    postUser(body);
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
              campo.label !== "Fecha de Emision" &&
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
                  campo.label === "Fecha de Emision" ||
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
