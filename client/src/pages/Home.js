import React, { useState, useEffect } from 'react';
import './Home.css'
import AppointmentCard from '../components/AppointmentCard';
import { useAppointmentsContext } from '../hooks/useAppointmentsContext';
import AppointmentsForm from '../components/AppointmentsForm';

const Root = () => {
  const { state, dispatch } = useAppointmentsContext()
  const { appointment } = state;  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleAppointments, setVisibleAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`http://localhost:4000/api/appointments/${userData.email}`);
  
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'SET_APPOINTMENT', payload: data });
  
          setLoading(false);
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
    if (appointment) {
      setAppointments(appointment.appointments || []);
    }
  }, [appointment]);

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
    <div className="home-container">
    <div className='appointments'>
      {loading && <div>Carregando...</div>}
      {!loading && appointment === null && <div>Nenhum agendamento encontrado.</div>}
      {visibleAppointments.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment} />
      ))}
      {appointments.length > 6 && 
        <div className="pagination">
        {renderPageNumbers()}
        </div>}
      </div>
      <AppointmentsForm />
    </div>
  );
};

export default Root;
