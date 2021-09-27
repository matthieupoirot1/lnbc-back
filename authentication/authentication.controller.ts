import * as bcrypt from 'bcrypt';
import * as express from 'express';
import UserWithSameEmailException from '../exceptions/UserWithSameEmailException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import ClientModel from '../BusinessLogic/clients/client.model';
import TokenData from './../interfaces/tokenData.interface'
import * as jwt from 'jsonwebtoken';
import Client from "../BusinessLogic/clients/client.interface";

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.loggingIn);
  }

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: Client = request.body;
    console.log(request.body);
    if (
      await ClientModel.findOne({ email: userData.email })
    ) {
      next(new UserWithSameEmailException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.hash, 10);
      console.log(userData);
      const user = await ClientModel.create({
        ...userData,
        hash: hashedPassword,
      }).catch((reason:any)=>{
        console.log("ERROR CREATING USER" + reason);
      });
      if(user) {
        user.hash = "";
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      }
    }
  }

  private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: { email:string, hash:string } = request.body;
    const user = await ClientModel.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.hash, user.hash);
      if (isPasswordMatching) {
        user.hash = "";
        let userAndToken = {user:user, tokenData:this.createToken(user)};
        response.send(userAndToken);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: Client): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET || "1785ec309aa83a12251f9c2fc872b9b4e1d2f7d0";
    const dataStoredInToken: { _id:string } = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationController;
