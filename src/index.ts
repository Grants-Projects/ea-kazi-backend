/** @format */

import "reflect-metadata";
import express, { Application } from "express";
import { config } from "./config";
import { AppDataSource } from "./utils/data-source";
import Routes from "./routes";
import response from './lib/response';
import passport from 'passport';
import jwtMiddleware from "./middleware/jwt.middleware";
import cors from "cors";
import { container } from 'tsyringe';
import { LoggerHelper } from "./helper/logger";
import cookieParser from 'cookie-parser';

const logger: any = container.resolve(LoggerHelper);

class Server {
  private app: Application;
  constructor() {
    this.app = express();
  }

  public configuration() {
    this.app.use(response);
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.json());

    // Initialize passport middleware
    this.app.use(passport.initialize());
    jwtMiddleware(passport);


    this.app.get("/", (req, res) => {
      res.status(200).json("starting...");
    });
    this.app.use("/health", (req, res) => {
      res.send({ status: "OK" });
    });
    Routes(this.app);
  }

  public async start() {
    AppDataSource.initialize();
    const PORT: any = config.web.port;
    this.configuration();
    this.app.listen(PORT, () => {
      logger.log(`Server is listening on port ${PORT}.`);
    });
  }
}
const server = new Server();
server.start();
process.on("SIGINT", function () {
  logger.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});
