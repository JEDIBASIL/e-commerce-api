import BaseAuth from "./base.auth";
import { NextFunction, Request, Response } from 'express';

class AdminAuth extends BaseAuth{
    constructor(req:Request,res:Response){
        super(req,res)
    }
    
}