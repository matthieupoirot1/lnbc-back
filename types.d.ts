import {Request} from "express";
import ClientModel from '../business_logic/clients/client.model';
//todo manage namespace merging to add client property on Request interface
declare global {
    namespace Express {
        interface Request {
            client?: ClientModel
        }
    }
}