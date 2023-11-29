import { Request, Response } from "express"
import couponModel from "../models/couponModel"

interface createCouponRequest {
    couponCode: string;
    discountPercent: number;
    expirationDate: Date;
    usageLimit: number;
    usageCount: number;
    isActive: boolean;
}

export const createCoupon = async (req: Request<createCouponRequest>, res: Response) => {
    const {couponCode, discountPercent, expirationDate, usageLimit, usageCount, isActive} = req.body
    try {
        // Add validations like userController

        const newCoupon = await couponModel.create({ couponCode, discountPercent, expirationDate, usageLimit, usageCount, isActive })

        res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCoupons = async (req: Request, res: Response) => {
    try {
        const allCoupons = await couponModel.find();
        res.status(200).json({ coupons: allCoupons });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

interface getCouponByIdRequest {
    couponId: string;
}

export const getCouponById = async (req: Request<getCouponByIdRequest>, res: Response) => {
    const { couponId } = req.params;
    try {
        const coupon = await couponModel.findById(couponId);

        if (!coupon) {
          return res.status(404).json({ message: 'Coupon not found' });
        }
    
        res.status(200).json({ coupon });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

interface getCouponByCodeRequest {
    couponCode: string;
}

export const getCouponByCode = async (req: Request<getCouponByCodeRequest>, res: Response) => {
    const { couponCode } = req.params;

    try {
        const coupon = await couponModel.findOne({ couponCode });

        if (!coupon) {
          return res.status(404).json({ message: 'Coupon not found' });
        }
    
        res.status(200).json({ coupon });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}