import { Request, Response } from "express"
import { Twilio } from "twilio";
import dotenv from 'dotenv';
import customerModel from "../models/customerModel";
import messageModel from "../models/messageModel";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);


export const sendMessage = async (req: Request, res: Response) => {
    const email: string = req.params.email

    try {
        const customer = await customerModel.findOne({email})
        const messageContent = "Nós sentimos sua falta! Na proxima visita informe o cupom NAREGUA10 para ganhar 10% de desconto na sua próxima visita! Disponível por 15 dias."

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
          }

        const customerWhatsapp = customer.telephone

        const message = new messageModel({ customer: customer._id, messageContent });
        await message.save();

        await customerModel.findByIdAndUpdate(customer._id, { $push: { messageLogs: message._id } });

        client.messages
        .create({
            body: messageContent,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${customerWhatsapp}`
        })
        .then(message => res.status(200).json({ message: message}))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}