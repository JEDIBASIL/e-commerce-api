import { config } from "dotenv"
config()
export const { PORT, DATABASE_URL, ACCESS_TOKEN, SECRET_TOKEN, MAIL_PASS, MAIL_SERVICE, MAIL_USER } = process.env