import { Request, Response } from "express"

interface createCustomerRequestBody {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
}

export const createCustomer = async (req: Request<createCustomerRequestBody>, res: Response) => {
    try {
    const {email, firstName, lastName, telephone} = req.body
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// depois criar um PATCH method para updatear o customer e sua data de visita