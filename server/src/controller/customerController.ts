import { Request, Response } from "express"
import customerModel from "../models/customerModel";

interface createCustomerRequestBody {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
}

export const createCustomer = async (req: Request<createCustomerRequestBody>, res: Response) => {
    const {email, firstName, lastName, telephone} = req.body
    try {
        const customer = await customerModel.create({ email, firstName, lastName, telephone })

        return res.status(200).json({email, firstName, lastName, telephone})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// depois criar um PATCH method para updatear o customer e sua data de visita