import { Request, Response } from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import { validateSignUp } from "../helper/validator"
import jwt from "jsonwebtoken"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

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

        // Create a JWT token
        const token = createToken(user._id);

        return res.status(200).json({email, token, firstName, lastName, barberShopName});
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}