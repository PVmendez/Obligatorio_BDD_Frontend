import React, { useEffect, useState } from "react";
import "./Formulario.css";
import { updateUser, getUsers } from "../../services/userServices";
import Modal from "react-modal";
import CalendarComponent from "../Calendar/CalendarComponent";
import { convertDates } from "../../utils/convertDates";

function Formulario() {
  const [users, setUsers] = useState([]);
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const storedUsername = localStorage.getItem("username");

  const campos = [
    { label: "CI", state: ci, setState: setCi, type: "text", pattern: "\\d*" },
    {
      label: "Nombre",
      state: nombre,
      setState: setNombre,
      type: "text",
      pattern: "[A-Za-z ]*",
    },
    {
      label: "Apellido",
      state: apellido,
      setState: setApellido,
      type: "text",
      pattern: "[A-Za-z ]*",
    },
    {
      label: "Fecha de Nacimiento",
      state: fechaNacimiento,
      setState: setFechaNacimiento,
      type: "date",
      pattern: "\\d{4}-\\d{2}-\\d{2}",
    },
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
      pattern: "\\d{4}-\\d{2}-\\d{2}",
    },
    {
      label: "Fecha de Vencimiento",
      state: fechaVencimiento,
      setState: setFechaVencimiento,
      type: "date",
      pattern: "\\d{4}-\\d{2}-\\d{2}",
    },
    {
      label: "Comprobante",
      state: comprobante,
      setState: setComprobante,
      type: "file",
      accept: "image/*",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const allFieldsFilled =
      ci !== "" &&
      nombre !== "" &&
      fechaNacimiento !== "" &&
      (isChecked
        ? fechaVencimiento !== "" && comprobante !== "" && fechaEmision !== ""
        : true);

    setIsButtonDisabled(!allFieldsFilled);
  }, [
    ci,
    nombre,
    fechaNacimiento,
    isChecked,
    fechaEmision,
    fechaVencimiento,
    comprobante,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundUser = users.find((user) => user.LogId === storedUsername);
    const userConditions =
      foundUser.Nombre.toLowerCase() === nombre.toLowerCase() &&
      foundUser.Apellido.toLowerCase() === apellido.toLowerCase() &&
      convertDates(foundUser.Fch_Nacimiento) ===
        fechaNacimiento;
    if (!userConditions)
      return setError(
        "La información ingresada no coincide con el funcionario de este usuario. Intente nuevamente."
      );
    else setError("");

    if (!isChecked && foundUser) setModalIsOpen(true);
    else {
      if (!foundUser)
        window.location.replace("http://localhost:3000/alta-funcionario");
      else await updateUser(foundUser);
    }
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const errorStyle = {
    color: "red",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div className="container">
      <h2>Bienvenido/a {storedUsername}, actualiza tus datos.</h2>
      {error && <p style={errorStyle}>{error}</p>}
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
                  pattern={campo.pattern}
                  accept={campo.accept}
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
                    pattern={campo.pattern}
                    accept={campo.accept}
                  />
                </label>
              ))}
          </div>
        )}
        <button
          type="submit"
          className="form-button"
          disabled={isButtonDisabled}
        >
          Guardar
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Detalles y Reserva"
        appElement={document.getElementById("root")}
      >
        <CalendarComponent ci={ci} />
      </Modal>
    </div>
  );
}

export default Formulario;
