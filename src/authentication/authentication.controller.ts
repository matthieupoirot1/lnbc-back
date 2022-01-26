import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import Controller from '../interfaces/controller.interface';
import TokenData from '../interfaces/tokenData.interface'
import ClientModel from '../business_logic/clients/client.model';
import Client from "../business_logic/clients/client.interface";
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import UserWithSameEmailException from '../exceptions/UserWithSameEmailException';
import RequiredFieldsException from "../exceptions/RequiredFieldsException";
import UserNotFoundException from "../exceptions/UserNotFoundException";

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
    console.log("----- IN REGISTRATION")
    const userData: Client = request.body;
    console.log(request.body);
    if (await ClientModel.findOne({ email: userData.email })) return next(new UserWithSameEmailException(userData.email));
      const hashedPassword = await bcrypt.hash(userData.hash, 10);
      console.log(userData);
      const user = await ClientModel.create({
        ...userData,
        hash: hashedPassword,
      }).catch((reason:any)=>{
        console.log(typeof reason);
        console.log("ERROR CREATING USER" + reason);
        return next(new RequiredFieldsException(Object.keys(reason.errors)));
      });
      if(user) {
        let userPOJO = user.toObject();
        userPOJO.hash = "";
        const tokenData = this.createToken(userPOJO);
        let userToSend = {
          ...userPOJO,
          token:tokenData,
        };
        response.send(userToSend);
      }
  }

  private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: Client = request.body;
    const user = await ClientModel.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.hash, user.hash);
      if (isPasswordMatching) {
        user.hash = "";
        const tokenData = this.createToken(user);
        console.log("USER POJO");
        let userPOJO = user.toObject();
        console.log(userPOJO)
        let userToSend = {
          ...userPOJO,
          token:tokenData,
        };
        response.send(userToSend);
      } else {
        return next(new WrongCredentialsException());
      }
    } else {
      return next(new UserNotFoundException());
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
