import { Request, Response } from "express";
import appointmentModel from "../models/appointmentModel";
import userModel from "../models/userModel";
import customerModel from "../models/customerModel";
import { convertTimeToMinutes } from "../helper/functions";

// Assuming you have the convertTimeToMinutes function defined as mentioned earlier

export const createAppointment = async (req, res) => {
    const { customerEmail, barberShopEmail } = req.params;
    const { date, time, serviceType, serviceDetails, price, notes } = req.body;

    try {
        const customer = await customerModel.findOne({ email: customerEmail });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        const barberShop = await userModel.findOne({ email: barberShopEmail });

        if (!barberShop) {
            return res.status(404).json({ error: 'Barber shop not found.' });
        }

        const existingAppointments = await appointmentModel.find({
            date,
            $or: [
                { customer: customer._id },
                { barberShop: barberShop._id }
            ]
        }).sort({ time: 1 }); // Sort appointments by time in ascending order

        const newAppointmentTime = convertTimeToMinutes(time);

        for (let i = 0; i < existingAppointments.length; i++) {
            const existingAppointmentTime = convertTimeToMinutes(existingAppointments[i].time);
            const timeDifference = Math.abs(existingAppointmentTime - newAppointmentTime);

            if (timeDifference < 30) {
                return res.status(400).json({ error: 'Minimum 30 minutes spacing required between appointments.' });
            }
        }

        const newAppointment = new appointmentModel({
            customer: customer._id,
            barberShop: barberShop._id,
            date: date,
            time: time,
            status: 'Agendado',
            serviceType: serviceType,
            serviceDetails: serviceDetails,
            price: price,
            notes: notes
        });

        await newAppointment.save();

        res.status(200).json({ message: 'Agendamento feito!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
