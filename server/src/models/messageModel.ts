import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

export interface MessageDocument extends Document {
    customer: Object;
    messageContent: string;
    timestamp: Date;
    status: string;
}

const messageSchema = new mongoose.Schema<MessageDocument>({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    messageContent: {type: String},
    timestamp: { type: Date, default: Date.now },
    status: {type: String},
});

const messageModel = mongoose.model<MessageDocument>('Message', messageSchema)

export default messageModel