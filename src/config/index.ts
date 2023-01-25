import { config } from "dotenv"
config()
export const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY, PORT, DATABASE_URL, ACCESS_TOKEN, SECRET_TOKEN, MAIL_PASS, MAIL_SERVICE, MAIL_USER } = process.env