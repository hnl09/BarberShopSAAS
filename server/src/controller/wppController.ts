import { Request, Response } from "express"
import { Twilio } from "twilio";
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);


export const sendMessage = async (req: Request, res: Response) => {
    try {
        client.messages
        .create({
            body: 'Se prepare Tarik!!!',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5511999105159'
        })
        .then(message => res.status(200).json({ message: message}))
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}