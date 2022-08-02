import 'reflect-metadata'
import express, { Application } from 'express'
import { config } from './config'
import { createConnection } from 'typeorm';
import connectionOpts from './typeormconfig';
import {DummyRouter} from "./routes"

import cors from 'cors'
class Server {
  private app: Application
  constructor() {
    this.app = express()
  }

  public configuration() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.get('/', (req, res) => {
      res.status(200).json('starting...')
    })
    this.app.use('/health', (req, res) => {
      res.send({ status: 'OK' })
    })
    this.app.use('/users', DummyRouter)
  }

  public async start() {
    createConnection(connectionOpts).then(async()=>{
      const PORT: any = config.web.port
        await this.configuration()
        this.app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}.`)
          })
    })
    
   //await sequelize.sync()
  }
}
const server = new Server()
 server.start()
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});
