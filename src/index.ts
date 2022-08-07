/** @format */

import "reflect-metadata";
import express, { Application } from "express";
import { config } from "./config";
import { AppDataSource } from "../src/utils/data-source";
import Routes from "../src/routes";
import response from './lib/response';

import cors from "cors";
class Server {
  private app: Application;
  constructor() {
    this.app = express();
  }

  public configuration() {
    this.app.use(response);
    this.app.use(cors());
    this.app.use(express.json());
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
      console.log(`Server is listening on port ${PORT}.`);
    });
  }
}
const server = new Server();
server.start();
process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});
