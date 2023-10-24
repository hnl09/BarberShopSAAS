import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => { 
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}

export default validate;