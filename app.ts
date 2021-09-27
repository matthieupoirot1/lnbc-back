import * as bodyParser from 'body-parser';
import express =require('express');
import * as mongoose from 'mongoose';
import cookieParser = require('cookie-parser');
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import authMiddleware from "./middlewares/auth.middleware";
import logMiddleware from "./middlewares/log.middleware";
import getAuthMiddleware from "./middlewares/auth.middleware";

const cors = require('cors');

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.use(cors({origin: '*',
      credentials: true}));

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    console.log("||| **** LOADING SERV **** |||")
    this.app.listen(3000, () => {
      console.log(`APP LISTENING AT 3000`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(logMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(getAuthMiddleware(["/auth/register", "/auth/connexion", "/clients/email"]));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(`mongodb://localhost:27017`).then(()=>{
      console.log(`||| **** CONNECTED TO DB ON : mongodb://localhost:37017test **** |||`)
    }).catch((reason:any)=>{
      console.log(reason);
    });
    mongoose.connection.on('error', console.error.bind(console, 'connection-page error'));
    mongoose.connection.once('open', function() {
      console.log("connected to bd !");
    });
  }
}

export default App;
