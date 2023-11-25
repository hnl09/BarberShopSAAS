import { Request, Response } from "express"
import appointmentModel from "../models/appointmentModel"
import userModel from "../models/userModel"
import customerModel from "../models/customerModel"

export const createAppointment = async (req: Request, res: Response) => {
    const { customerEmail, barberShopEmail } = req.params;

    const { date, time, serviceType, serviceDetails, price, notes } = req.body;

    try {
        const customer = await customerModel.findOne({customerEmail})

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        const barberShop = await userModel.findOne({barberShopEmail})

        if (!barberShop) {
            return res.status(404).json({ error: 'Barber shop not found.' });
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
        })

        await newAppointment.save()

        res.status(200).json({message: 'Agendamento feito!'})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}