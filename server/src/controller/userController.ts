import { Request, Response } from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import { validateSignUp, validateLogin } from "../helper/validator"
import jwt from "jsonwebtoken"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

interface LoginRequestBody {
    email: string;
    password: string;
}

export const loginUser = async (req: Request<LoginRequestBody>, res: Response) => {
    const {email, password} = req.body
    try {
    const errors = await validateLogin(email, password);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    const user = await userModel.findOne({ email: email });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(400).json({ errors: ["Invalid login credentials"] });
    }

    // Create a JWT token
    const token = createToken(user._id);    

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({userWithoutPassword, token})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

interface SignUpRequestBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    barberShopName: string;
    telephone: string;
}

export const signUpUser = async (req: Request<SignUpRequestBody>, res: Response) => {
    const {email, password, firstName, lastName, barberShopName, telephone} = req.body

    const errors = await validateSignUp(email, password);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
      
        const user = await userModel.create({ email, password: hash, firstName, lastName, barberShopName, telephone });

        // Create a JWT token
        const token = createToken(user._id);

        return res.status(200).json({email, token, firstName, lastName, barberShopName, telephone});
    } catch (error){
        return res.status(500).json({ message: error.message });
    }
}