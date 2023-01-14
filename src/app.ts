import express from "express"
import { ConnectOptions, Error, connect } from "mongoose";
import { dbConnection } from "./database";
import { IRoute } from "./interface";
import logger from "./utils/logger";

class App {
    public app: express.Application;
    public port: number;
    constructor(routes: IRoute[]) {
        this.databaseConnection(); 
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.port = 8084;
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
            logger.info(`▼                                   ▼`)
            logger.info(`▼ 🚀 🅻🅸🆂🆃🅴🅽🅸🅽🅶 🅾🅽 🅿🅾🆁🆃 ${this.port}         ▼`)
            logger.info(`▼                                   ▼`)
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
        })
    }

    async databaseConnection() {
        try {
            await connect(dbConnection.uri as string, dbConnection.options as ConnectOptions)
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
            logger.info(`▼                                   ▼`)
            logger.info(`▼ 🛢  🅳🅰🆃🅰🅱🅰🆂🅴 🅲🅾🅽🅽🅴🅲🆃🅴🅳             ▼`)
            logger.info(`▼                                   ▼`)
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message)
        }
    }
    initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes(routes: IRoute[]) {
        routes.forEach(route => this.app.use("/api/v1", route.route))
    }
}

export default App;