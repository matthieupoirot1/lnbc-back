import {Express, Request, Response, NextFunction} from 'express';

import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import ClientModel from '../business_logic/clients/client.model';
import {compareSync} from "bcrypt";


function getAuthMiddleware(excludedRoutes: string[]) {
    return function authMiddleware(request: Request, response: Response, next: NextFunction) {
        for(const excludedRoute of excludedRoutes){
            console.log(request.originalUrl.includes(excludedRoute));
            if (request.originalUrl.includes(excludedRoute)) {
                return next();
            }
        }
        if (!request.header("Authorization")) return next(new AuthenticationTokenMissingException());
        let token = request.header("Authorization");
        console.log("confronting token's id with server id : \n =======>");
        console.log(token);
        const secret = process.env.JWT_SECRET || "1785ec309aa83a12251f9c2fc872b9b4e1d2f7d0";
        jwt.verify(token!, secret, (err, payload) => {
            console.log("decoding token sent. Err ? => " + err);
            if (err && err.name.includes('Expired')) return next(new WrongAuthenticationTokenException(true));
            if (err) return next(new WrongAuthenticationTokenException());
            console.log("got id : " + payload?._id);
            let id: { _id: string } = payload?._id ?? "error";
            // @ts-ignore
            ClientModel.findById(id, (err, user) => {
                if (err || !user) return next(new WrongAuthenticationTokenException());
                console.log("found user : " + user);
                request.client = user;
                next();
            });
        });
    }
}

export default getAuthMiddleware;