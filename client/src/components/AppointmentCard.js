import React from 'react';

const AppointmentCard = ({ appointment }) => {

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

  return (
    <div className="appointment-card">
      <h2>{appointment.customer.firstName} {appointment.customer.lastName}</h2>
      <p>Data: {formatDate(appointment.date)}</p>
      <p>Time: {appointment.time}</p>
      <p>Price: {appointment.price}</p>
    </div>
  );
};

export default AppointmentCard;