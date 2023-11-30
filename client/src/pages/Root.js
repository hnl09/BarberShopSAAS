import React, { useState, useEffect } from 'react';
import './Root.css'

const Root = () => {
  const [appointments, setAppointments] = useState([]);
  const [visibleAppointments, setVisibleAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/appointments/henriquenl09@gmail.com');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        // Extract the 'appointments' array from the response data
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    setVisibleAppointments(appointments.slice(indexOfFirstAppointment, indexOfLastAppointment));
  }, [appointments, currentPage]);

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="root-container">
      <h1>Agendamentos</h1>
      {visibleAppointments.map((appointment, index) => (
        <div key={index} className="appointment-card">
          <h2>{appointment.customer.firstName} {appointment.customer.lastName}</h2>
          <p>Data: {formatDate(appointment.date)}</p>
          <p>Hora: {appointment.time}</p>
          <p>Valor: R$ {appointment.price}</p>
          <p>Situação: {appointment.status}</p>
        </div>
      ))}
      {appointments.length > 6 && 
        <div className="pagination">
        {renderPageNumbers()}
      </div>}
    </div>
  );
};

export default Root;
