import { NextFunction, Request, Response } from 'express';
import JwtToken from '../utils/token';
import HttpException from '../exceptions/HttpException';
import logger from '../utils/logger';
class BaseAuth {
    protected token: string;
    protected value: string;
    private jwt = new JwtToken()
    constructor(req: Request, res: Response) {
        this.token = req.headers.authorization?.split(' ')[1] as string
        this.value = this.jwt.verifyJwt(this.token)["value"]
    }
    static async check(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            if (token) {
                return next();
            }
            throw new HttpException(401, "token required")
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
}
export default BaseAuth