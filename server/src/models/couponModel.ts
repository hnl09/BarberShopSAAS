import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

interface CouponDocument extends Document {
    couponCode: string;
    discountPercent: number;
    expirationDate: Date;
    usageLimit: number;
    usageCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const couponSchema = new Schema<CouponDocument>({
    couponCode: {type: String, required: true, unique: true},
    discountPercent: {type: Number, required: true},
    expirationDate: {type: Date},
    usageLimit: {type: Number, required: true},
    usageCount: {type: Number, required: true},
    isActive: {type: Boolean, default: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const couponModel = mongoose.model<CouponDocument>('Coupon', couponSchema)

export default couponModel