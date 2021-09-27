import { Express, Request, Response, NextFunction } from 'express';
const express = require('express');
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../BusinessLogic/users/user.model';
import HttpException from "../exceptions/HttpException";


function getAuthMiddleware(excludeRoutes: string[]){
  return function authMiddleware(request: Request, response: Response, next: NextFunction){
    if(excludeRoutes.includes(request.originalUrl)){
      next();
    }else {
      console.log("heyyyyy");
      const cookies = request.cookies;
      if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET || "HEYHEYANTHOMATTHNANANA";
        const verificationResponse = jwt.verify(cookies.Authorization, secret) as { _id: String };
        const id = verificationResponse._id;
        const user = userModel.findById(id).then((user) => {
          if (user) {
            //request.user = user;
            next();
          } else {
            next(new WrongAuthenticationTokenException());
          }
        }).catch(() => {
          next(new WrongAuthenticationTokenException());
        });
      } else {
        next(new AuthenticationTokenMissingException());
      }
    }
  };
}


export default getAuthMiddleware;
