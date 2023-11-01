import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import userModel, {UserDocument} from "../models/userModel"

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({message: "Authorization token required"})
    }
    const token = authorization.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
        const { _id } = decodedToken;

        const user = await userModel.findOne({ _id }).select('_id')
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message: 'Request is not authorized'})
    }
}

export default requireAuth