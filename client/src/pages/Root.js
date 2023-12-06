import React, { useState, useEffect } from 'react';
import './Root.css'
import AppointmentCard from '../components/AppointmentCard';
import { useAppointmentsContext } from '../hooks/useAppointmentsContext';



const Root = () => {
  const { dispatch } = useAppointmentsContext()
  const [appointments, setAppointments] = useState([]);
  const [visibleAppointments, setVisibleAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`http://localhost:4000/api/appointments/${userData.email}`);
        const data = await response.json();
  
        if (response.ok) {
          dispatch({ type: 'SET_APPOINTMENT', payload: data });
  
          setAppointments(data.appointments || []);
        } else {
          throw new Error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    fetchAppointments();
  }, [dispatch]);
  

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
        <AppointmentCard key={index} appointment={appointment} />
      ))}
      {appointments.length > 6 && 
        <div className="pagination">
        {renderPageNumbers()}
      </div>}
    </div>
  );
};

export default Root;
