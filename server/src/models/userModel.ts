import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

export interface UserDocument extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    barberShopName: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isVerified: boolean;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    barberShopName: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    isActive: {type: Boolean, default: true},
    isVerified: {type: Boolean, default: false}
})

const userModel = mongoose.model<UserDocument>('User', userSchema)

export default userModel