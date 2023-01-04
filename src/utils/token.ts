import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

class JwtToken {
    async signJwt(value: string) {
        jwt.sign(value, ACCESS_TOKEN as unknown as string, { expiresIn: "10m" });
    }
    async verifyJwt(value: string) {
        jwt.verify(value, ACCESS_TOKEN as unknown as string)
    }
}

export default JwtToken