import { Request, Response } from "express"
import userModel from "../models/userModel"

export const loginUser = async (req: Request, res: Response) => {
    res.json({ message: "Login user" })
}

export const signUpUser = async (req: Request, res: Response) => {
    res.json({ message: "Signup user" })
}