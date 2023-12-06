import React, { useState } from 'react';

const AppointmentCard = ({ appointment }) => {
  const [status, setStatus] = useState(appointment.status);
  const [finished, setFinished] = useState('Finalizar atendimento')

  const updatedDate = new Date();

  const changeStatus = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`http://localhost:4000/api/appointments/update/${appointment.customer.email}/${userData.email}/${appointment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'Finalizado',
          updatedAt: updatedDate.toISOString()
        })
      });


      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      setStatus('Finalizado');
      setFinished('Atendimento Finalizado!')
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/appointments/delete/${appointment._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete appointment');
        }

        const divToRemove = document.querySelector(`.app1011${appointment._id}`);
        if (divToRemove) {
          divToRemove.remove();
        }
      } catch (error) {
        console.error('Error Deleting Appointment:', error);
    }
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // Adicionar funcionalidade de remarcar
  return (
    <div className={`appointment-card app1011${appointment._id}`}>
      <h2>{appointment.customer.firstName} {appointment.customer.lastName}</h2>
      <p>Data: {formatDate(appointment.date)}</p>
      <p>Hora: {appointment.time}</p>
      <p>Valor: R$ {appointment.price}</p>
      {appointment.serviceType !== "" && <p>Tipo de Serviço: {appointment.serviceType}</p>}
      {appointment.serviceDetails !== "" && <p>Detalhes do Serviço: {appointment.serviceDetails}</p>}
      {appointment.notes !== "" && <p>Notas: {appointment.notes}</p>}
      <p>Situação: {status}</p>
      {appointment.status === "Finalizado" && <button>Remarcar</button>}
      {appointment.status === "Agendado" && <button onClick={changeStatus}>{finished}</button>}
      <button onClick={deleteAppointment}>Deletar</button>
    </div>
  );
};

export default AppointmentCard;
