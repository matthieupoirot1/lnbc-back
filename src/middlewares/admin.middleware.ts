import { Express, Request, Response, NextFunction } from 'express';
const express = require('express');
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import AdminReservedException from "../exceptions/AdminReservedException";


function getAdminMiddleware(){
    return function adminMiddleware(request: Request, response: Response, next: NextFunction){
        if(request.client.isAdmin){
            next();
        }else{
            next(new AdminReservedException())
        }
    };
}


export default getAdminMiddleware;
