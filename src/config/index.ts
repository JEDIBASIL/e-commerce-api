import { config } from "dotenv"
config()
export const { PORT, DATABASE_URL, ACCESS_TOKEN, SECRET_TOKEN } = process.env