import { 
    Request, 
    Response, 
    NextFunction, 
} from "express";

import { user, IUser, IOrder, IProduct, IReview } from "../../client/src/types/interfaces";
import  jwt, {JwtPayload}  from 'jsonwebtoken';

export function isAuthRequest(req: Request): req is AuthRequest {
    return "user" in req;
}


export type asyncHandlerRequestHandler<T extends Request = Request> = (
    req: T,
    res: Response,
    next: NextFunction
) => Promise<void>;

// export type AuthRouteHandler = (
//     fn: asyncHandlerRequestHandler<AuthRequest>
// ) => Promise<void>;

// export interface AuthRequestBody {
//     email: string;
//     password: string;
// }


export interface AuthRequest extends Request {
    params: {
        id: string;
    };
    user: IUser;
    cookies: {
        jwt: string;
    };
}
export interface OrderRequest extends AuthRequest {
    body: IOrder;
    params:{
        id:string;
        keyword:string;
        pageNumber: string;
    };
}
export interface ProductRequest extends AuthRequest {
    body: IProduct;
};
// export interface AdminOrderRequest extends AuthRequest {
//     body: IOrder[];
// }
export interface ReviewProductRequest extends AuthRequest{
    body:IReview,
};

export interface AuthDecoded {
    userId: string;
    iat: number;
    exp: number;
}