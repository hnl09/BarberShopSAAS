import React, { useState } from 'react';

const AppointmentCard = ({ appointment }) => {
  const [status, setStatus] = useState(appointment.status);
  const [finished, setFinished] = useState('Finalizar atendimento')

  const updatedDate = new Date();

  const changeStatus = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/appointments/update/${appointment.customer.email}/henriquenl09@gmail.com/${appointment._id}`, { // change barbershopemail to dynamic with context
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

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // Adicionar funcionalidade de remarcar
  return (
    <div className="appointment-card">
      <h2>{appointment.customer.firstName} {appointment.customer.lastName}</h2>
      <p>Data: {formatDate(appointment.date)}</p>
      <p>Hora: {appointment.time}</p>
      <p>Valor: R$ {appointment.price}</p>
      {appointment.serviceType !== "" && <p>Tipo de Serviço: {appointment.serviceType}</p>}
      {appointment.serviceDetails !== "" && <p>Detalhes do Serviço: {appointment.serviceDetails}</p>}
      {appointment.notes !== "" && <p>Notas: {appointment.notes}</p>}
      <p>Situação: {status}</p>
      {appointment.status == "Finalizado" && <button>Remarcar</button>}
      {appointment.status == "Agendado" && <button onClick={changeStatus}>{finished}</button>}

    </div>
  );
};

export default AppointmentCard;
