import { Request, Response } from "express";
import appointmentModel, { appointmentSchema } from "../models/appointmentModel";
import userModel from "../models/userModel";
import customerModel from "../models/customerModel";
import { convertTimeToMinutes } from "../helper/functions";

export const getAppointments = async (req: Request, res: Response) => {
    const barberShopEmail: string = req.params.barberShopEmail;

    try {
        const barberShop = await userModel.findOne({ email: barberShopEmail });

        if (!barberShop) {
            return res.status(404).json({ error: 'Barber shop not found.' });
        }

        const appointments = await appointmentModel
            .find({ barberShop: barberShop._id })
            .populate('customer')
            .populate({
                path: 'barberShop',
                select: '-password' // Exclude the password field
            })
            .sort({ date: -1, time: -1 }); // Sort by date in descending order, then time in descending order

        return res.status(200).json({ appointments });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

interface createAppointmentRequest {
    customerEmail: string;
    barberShopEmail: string;
    date: string;
    time: string;
    serviceType: string;
    serviceDetails?: string;
    price: number;
    notes?: string;
}

// Método para agendar consulta, do lado do React terá um form para criar a consulta.
export const createAppointment = async (req: Request<createAppointmentRequest>, res: Response) => {
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

        res.status(201).json(newAppointment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

interface updateAppointmentRequest {
    customerEmail: string;
    barberShopEmail: string;
    appointmentId: string;
    date?: string;
    time?: string;
    status?: string;
    serviceType?: string;
    serviceDetails?: string;
    price?: number;
    notes?: string;
}

export const updateAppointment = async (req: Request, res: Response) => {
    const { customerEmail, barberShopEmail, appointmentId } = req.params;

    try {
        const customer = await customerModel.findOne({ email: customerEmail });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        const barberShop = await userModel.findOne({ email: barberShopEmail });

        if (!barberShop) {
            return res.status(404).json({ error: 'Barber shop not found.' });
        }

        const appointment = await appointmentModel.findOne({ _id: appointmentId })

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        Object.keys(req.body).forEach((key) => {
            if (key in appointmentSchema.paths) {
                appointment[key] = req.body[key]
            }
        })

        appointment.updatedAt = new Date();

        await appointment.save()

        return res.status(200).json({appointment})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAppointment = async (req: Request, res: Response) => {
    const { appointmentId } = req.params;

    try {
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    await appointmentModel.findByIdAndDelete(appointmentId);

    return res.status(200).json({ message: 'Appointment deleted successfully.' });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}