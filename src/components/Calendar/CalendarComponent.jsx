import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

import "./CalendarComponent.css";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleReserveClick = () => {
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

    const result = date >= today || isDateReserved(date);

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
      <div></div>
    </div>
  );
};

export default CalendarComponent;
