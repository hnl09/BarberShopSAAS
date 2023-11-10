import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

export interface CustomerDocument extends Document {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    lastVisit: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const customerSchema = new Schema<CustomerDocument>({
    email: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    telephone: {type: String, required: true, unique: true},
    lastVisit: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const customerModel = mongoose.model<CustomerDocument>('Customer', customerSchema)

export default customerModel