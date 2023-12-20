import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../../client/src/types/interfaces";

const generateToken = (res:Response, userId:string) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
    // set jwt as HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
}

export default generateToken 