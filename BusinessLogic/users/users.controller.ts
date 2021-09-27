import * as express from 'express';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import Controller from '../../interfaces/controller.interface';
import User from './user.interface';
import UserModel from './user.model';
import * as mongoose from "mongoose";
import { nextTick } from 'process';
import EmailMissingException from '../../exceptions/EmailMissingException';

class PostsController implements Controller {
  public path = '/users';
  public router = express.Router();
  private UserModel = UserModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.patch(`${this.path}/:id`, this.modifyUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.post(this.path, this.createUser);
    this.router.post(this.path+'/email', this.isEmailTaken)
  }

  private getAllUsers = (request: express.Request, response: express.Response) => {
    this.UserModel.find()
      .then((users: User[]) => {
        response.json(users);
      });
  }

  private getUserById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    this.UserModel.findById(id)
      .then((user:(User&mongoose.Document|null)) => {
        if (user) {
          response.send(user);
        } else {
          next(new UserNotFoundException(id));
        }
      });
  }

  private modifyUser = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const postData: User = request.body;
    this.UserModel.findByIdAndUpdate(id, postData, { new: true })
      .then((user:User&mongoose.Document|null) => {
        if(user) {
          response.send(user);
        } else {
          next(new UserNotFoundException(id));
        }
      });
  }

  private deleteUser = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    this.UserModel.findByIdAndDelete(id)
      .then((successResponse: User&mongoose.Document|null) => {
        if (successResponse) {
          response.send(200);
        } else {
          next(new UserNotFoundException(id));
        }
      });
  }

  private createUser = (request: express.Request, response: express.Response, next:express.NextFunction) => {
    const userData: User = request.body;
    console.log(userData);
    const createdUser = new this.UserModel(userData);
    createdUser.save()
      .then((savedUser) => {
        response.send(savedUser);
      }).catch((reason:any)=>{
        console.log(reason);
        return next(new EmailMissingException());
      });
  }

  private isEmailTaken = (request: express.Request, response: express.Response, next:express.NextFunction) => {
    const emailToCheck: string = request.body.email;
    console.log("in backend checking if email is taken : "+emailToCheck);
    this.UserModel.findOne({email:emailToCheck}, (err: any, user: any)=>{
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

export default PostsController;
