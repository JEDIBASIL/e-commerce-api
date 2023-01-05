import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

class JwtToken {
    async signJwt(value: string, expiresIn:string|number) {
        return jwt.sign({value}, ACCESS_TOKEN as unknown as string, { expiresIn });
    }
    async verifyJwt(value: string) {
        return jwt.verify(value, ACCESS_TOKEN as unknown as string)
    }
}

export default JwtToken