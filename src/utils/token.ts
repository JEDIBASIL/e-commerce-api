import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

class JwtToken {
     signJwt(value: string, expiresIn:string|number) {
        return jwt.sign({value}, ACCESS_TOKEN as unknown as string, { expiresIn });
    }
     verifyJwt(value: string) {
        return jwt.verify(value, ACCESS_TOKEN as unknown as string)
    }
}
 
export default JwtToken