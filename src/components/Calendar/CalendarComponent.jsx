import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

import "./CalendarComponent.css";
import { createReserve, getReserves } from "../../services/reservesServices";
import { getEmployee } from "../../services/userServices";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reserves, setReserves] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Modal.setAppElement("#root");
    const fetchUsers = async () => {
      try {
        const userData = await getReserves();
        setReserves(userData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const errorStyle = {
    color: "red",
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleReserveClick = () => {
    const username = localStorage.getItem("username");
    const employee = getEmployee(username);
    const hasReserve = reserves.map((reserve) => employee.ci === reserve.ci);
    if (!hasReserve) createReserve({ date: selectedDate, logId: employee.ci });
    else setError("Ya existe una reserva para este usuario.")
    setReservedDates([...reservedDates, selectedDate]);
    setSelectedDate(null);
    setModalIsOpen(false);
  };

  const isDateReserved = (date) => {
    if (!date) return;
    return reservedDates.some(
      (reservedDate) => reservedDate.toDateString() === date.toDateString()
    );
  };

  const filterDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isExcluded = reserves.some(
      (reservedDate) => reservedDate.fecha === date.toISOString()
    );

    const result = date >= today && !isExcluded;

    return result;
  };

  return (
    <div className="main-container">
      <h2>Cita para renovar/sacar carné de salud</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        highlightDates={reservedDates}
        inline
        filterDate={filterDates}
        calendarClassName="custom-calendar"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Detalles y Reserva"
        appElement={document.getElementById("root")}
      >
        <h2>Detalles de la Reserva</h2>
        <p>Fecha seleccionada: {selectedDate && selectedDate.toDateString()}</p>
        <button
          disabled={isDateReserved(selectedDate)}
          onClick={handleReserveClick}
          className="reserve-btn"
        >
          Reservar
        </button>
        <button onClick={() => setModalIsOpen(false)} className="close-btn">
          Cerrar
        </button>
      </Modal>
      <div>
      {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>
  );
};

export default CalendarComponent;
