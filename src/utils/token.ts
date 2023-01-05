import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

class JwtToken {
    async signJwt(value: string) {
        return jwt.sign({value}, ACCESS_TOKEN as unknown as string, { expiresIn: 60*10+"s" });
    }
    async verifyJwt(value: string) {
        return jwt.verify(value, ACCESS_TOKEN as unknown as string)
    }
}

export default JwtToken