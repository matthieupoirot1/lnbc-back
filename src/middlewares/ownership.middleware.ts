import { Express, Request, Response, NextFunction } from 'express';
const express = require('express');
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../business_logic/users/user.model';
import HttpException from "../exceptions/HttpException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";


function getOwnershipMiddleware(){
    return function ownershipMiddleware(request: Request, response: Response, next: NextFunction){
            if(request.client.id == request.params.id || request.client.isAdmin){
                next();
            }else{
                next(new WrongAuthenticationTokenException())
            }
        };
}


export default getOwnershipMiddleware;
