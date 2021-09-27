import * as express from 'express';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import Controller from '../../interfaces/controller.interface';
import Client from './client.interface';
import ClientModel from './client.model';
import * as mongoose from "mongoose";
//import { nextTick } from 'process';
//import EmailMissingException from '../../exceptions/EmailMissingException';

class ClientsController implements Controller {
  public path = '/clients';
  public router = express.Router();
  private ClientModel = ClientModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllClients);
    this.router.get(`${this.path}/:id`, this.getClientById);
    this.router.patch(`${this.path}/:id`, this.modifyClient);
    this.router.delete(`${this.path}/:id`, this.deleteClient);
    this.router.post(this.path, this.createClient);
    this.router.post(this.path+'/email', this.isEmailTaken)
  }

  private getAllClients = (request: express.Request, response: express.Response) => {
    ClientModel.find()
      .then((clients: Client[]) => {
        response.json(clients);
      });
  }

  private getClientById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    ClientModel.findById(id)
      .then((client:(Client&mongoose.Document|null)) => {
        if (client) {
          response.send(client);
        } else {
          next(new UserNotFoundException(id));
        }
      });
  }

  private modifyClient = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const postData: Client = request.body;
    ClientModel.findByIdAndUpdate(id, postData, { new: true })
      .then((client:Client&mongoose.Document|null) => {
        if(client) {
          response.send(client);
        } else {
          next(new UserNotFoundException(id));
        }
      });
  }

  private deleteClient = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    ClientModel.findByIdAndDelete(id)
      .then((successResponse: Client&mongoose.Document|null) => {
        if (successResponse) {
          response.send(200);
        } else {
          next(new UserNotFoundException(id));
        }
      });
  }

  private createClient = (request: express.Request, response: express.Response, next:express.NextFunction) => {
    const clientData: Client = request.body;
    console.log(clientData);
    const createdClient = new ClientModel(clientData);
    createdClient.save()
      .then((savedClient) => {
        response.send(savedClient);
      }).catch((reason:any)=>{
      console.log(reason);
      return next();
    });
  }

  private isEmailTaken = (request: express.Request, response: express.Response, next:express.NextFunction) => {
    const emailToCheck: string = request.body.email;
    console.log("in backend checking if email is taken : "+emailToCheck);
    ClientModel.findOne({email:emailToCheck}, (err: any, user: any)=>{
      if(err) return console.log(err);
      if(user){
        console.log("in backend email is taken : " + emailToCheck);
        response.send(true);
      }else{
        console.log("in backend email is NOT taken : " + emailToCheck);
        response.send(false);
      }
    });
  }
}

export default ClientsController;
