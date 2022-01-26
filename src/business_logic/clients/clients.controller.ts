import * as express from 'express';
import Client from './client.interface';
import ClientModel from './client.model';
import BaseController from "../base.controller";

class ClientsController extends BaseController<Client> {
  constructor() {
    super('/clients', ClientModel, express.Router())
    this.router.post(this.path+'/email', this.isEmailTaken)
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
