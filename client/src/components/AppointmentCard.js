import React from 'react';

const AppointmentCard = ({ appointment }) => {

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
      };

  return (
    <div className="appointment-card">
      <h2>{appointment.customer.firstName} {appointment.customer.lastName}</h2>
      <p>Data: {formatDate(appointment.date)}</p>
      <p>Hora: {appointment.time}</p>
      <p>Valor: R${appointment.price}</p>
    </div>
  );
};

export default AppointmentCard;