import mongoose from "mongoose";

const Schema = mongoose.Schema

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const userModel = mongoose.model<UserDocument>('User', userSchema)

export default userModel