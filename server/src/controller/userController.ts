import { Request, Response } from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import validator from 'validator'
import { validateSignUp } from "../helper/validator"

export const loginUser = async (req: Request, res: Response) => {
    res.json({ message: "Login user" })
}

interface SignUpRequestBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    barberShopName: string;
}

export const signUpUser = async (req: Request<SignUpRequestBody>, res: Response) => {
    const {email, password, firstName, lastName, barberShopName} = req.body

    const errors = await validateSignUp(email, password);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
      
        const user = await userModel.create({ email, password: hash, firstName, lastName, barberShopName });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json(userWithoutPassword);
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}