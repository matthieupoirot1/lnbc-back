import { NextFunction, Request, Response } from 'express';

function logMiddleware(request: Request, response: Response, next: NextFunction) {
    const currentDateTime = new Date(Date.now());
    let date = currentDateTime.getDate();
    let month = currentDateTime.getMonth() + 1;
    let year = currentDateTime.getFullYear();
    console.log('Recu a :', year + "-" + month + "-" + date, "=========> "+request.originalUrl);
    next();
}

export default logMiddleware;
