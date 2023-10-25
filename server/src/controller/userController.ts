import { Request, Response } from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import validator from 'validator'

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

    // Validation Email and Password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required'});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({ message: 'Email is not valid'});
    }

    if(!validator.isStrongPassword(password)){
        return res.status(400).json({ message: 'Password is not strong enough'})
    }

    const emailExists = await userModel.findOne({ email: email })
    if (emailExists) {
        return res.status(400).json({ message: 'Email already exists'});
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