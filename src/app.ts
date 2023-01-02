import express from "express"
import { ConnectOptions, Error, connect } from "mongoose";
import { dbConnection } from "./database";

class App {
    public app: express.Application;
    public port: number;
    constructor() {
        this.port = 8080;
        this.databaseConnection()
        this.app = express();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`app listening on port ${this.port}`)
        })
    }

    async databaseConnection(){
        try{
           await connect(dbConnection.uri as string, dbConnection.options as ConnectOptions)
           console.log("database connected successfully")
        }catch(err:unknown){
            if(err instanceof Error) console.log(err.message)
        }
    }

}

export default App;