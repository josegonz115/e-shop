import  jwt, {JwtPayload}  from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User from '../models/userModel';
import { 
    AuthRequest, 
    isAuthRequest,
    AuthDecoded
} from '../types/types';
import { Request, Response,NextFunction, RequestHandler } from 'express';
import { IUser } from '../../client/src/types/interfaces';

// protect routes
const protect= asyncHandler<AuthRequest>(async(req,res,next) => {
    console.log("protect:",req.params.id);
    let token;
    // read the JWT from the cookie
    token = req.cookies.jwt;
    if(token){
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT secret is not defined');
            }
            const decoded = jwt.verify(token, secret) as AuthDecoded;
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
});

// admin middleware
const admin = (req:any, res:any, next:any) => {
    console.log("admin:",req.params.id);
    if (!isAuthRequest(req) || !req.user?.isAdmin) {
        res.status(401);
        throw new Error("Not authorized as admin");
        return;
    }
    next();
};

export { protect, admin };