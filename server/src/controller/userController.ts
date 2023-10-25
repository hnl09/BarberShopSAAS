import { Request, Response } from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"

export const loginUser = async (req: Request, res: Response) => {
    res.json({ message: "Login user" })
}

export const signUpUser = async (req: Request, res: Response) => {
    const {email, password, firstName, lastName, barberShopName} = req.body

    try {
        const emailExists = await userModel.findOne({ email: email })
        if (emailExists) {
            res.status(400).send({ message: 'Email already exists'});
            throw new Error('Email already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
      
        const user = await userModel.create({ email, password: hash, firstName, lastName, barberShopName });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        
        console.log(barberShopName)

        res.status(200).json(userWithoutPassword);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}