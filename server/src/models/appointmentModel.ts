import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

export interface AppointmentDocument extends Document {
    customer: Object;
    barberShop: Object;
    date: Date;
    time: string;
    status: string;
    serviceType: string;
    serviceDetails: string;
    price: number;
    createdAt: Date;
    notes: string;
}

const appointmentSchema = new Schema<AppointmentDocument>({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    barberShop: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: [{ type: String }],
    serviceType: { type: String, required: true },
    serviceDetails: String,
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    notes: String
})

const appointmentModel = mongoose.model<AppointmentDocument>('Appointment', appointmentSchema)

export default appointmentModel