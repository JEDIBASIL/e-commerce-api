import { DATABASE_URL } from "../config";

const dbConnection ={
    uri:DATABASE_URL,
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}
export {dbConnection}