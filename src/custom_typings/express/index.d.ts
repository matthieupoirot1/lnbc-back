import ClientModel from '../../business_logic/clients/client.model';

declare module 'express-serve-static-core' {
    interface Request {
        client?: ClientModel
    }
}