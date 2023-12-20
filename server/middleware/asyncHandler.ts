import { Request, Response, NextFunction, Handler } from "express";
import { asyncHandlerRequestHandler } from '../types/types';


const asyncHandler = <T extends Request>(fn: asyncHandlerRequestHandler<T>):Handler => {
    return (req:any, res:any, next: any) => {
        Promise.resolve(fn(req as T, res, next)).catch(next);
    };
};

//   const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
//   (req: Request, res: Response, next: NextFunction): Promise<any> => 
//     Promise.resolve(fn(req, res, next)).catch(next);

// const asyncHandler = (fn:any) => (req:any, res:any, next:any) =>
//     Promise.resolve(fn(req, res, next)).catch(next);

// const asyncHandler = <Req = Request, Res = Response>(
//     fn: (req: Req, res: Res, next: any) => Promise<void>) => 
//     (req: Req, res: Res, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

    export default asyncHandler;