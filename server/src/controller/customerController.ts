import { Request, Response } from "express"
import customerModel, {customerSchema} from "../models/customerModel";

interface createCustomerRequestBody {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
}

export const createCustomer = async (req: Request<createCustomerRequestBody>, res: Response) => {
    const {email, firstName, lastName, telephone} = req.body
    try {
        // Add validations like userController

        const customer = await customerModel.create({ email, firstName, lastName, telephone })

        return res.status(201).json({customer})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

interface updateCustomerRequestBody {
    email?: string;
    firstName?: string;
    lastName?: string;
    telephone?: string;
    lastVisit?: Date;
}

// Client terá que ter um botão com se o cliente visitou a barbearia e aí atualiza o lastVisit com o método new Date() do lado do React
export const updateCustomer = async (req: Request<updateCustomerRequestBody>, res: Response) => {
    const email: string = req.params.email

    try {
        const customer = await customerModel.findOne({email})

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        
        // Update only the provided fields in the request body

        Object.keys(req.body).forEach((key) => {
            if (key in customerSchema.paths) {
                customer[key] = req.body[key];
            }
        });

        customer.updatedAt = new Date();

        await customer.save();

        return res.status(200).json({customer})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}