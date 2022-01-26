import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import * as mongoose from "mongoose";
import getAdminMiddleware from "../middlewares/admin.middleware";
import ClothNotFoundException from "../exceptions/clothes/ClothNotFoundException";
import {Router} from "express";
import getOwnershipMiddleware from "../middlewares/ownership.middleware";

class BaseController<T> implements Controller {
    public path = '';
    public router: Router;
    public model : mongoose.Model<T & mongoose.Document>;

    constructor(path: string, model: mongoose.Model<T & mongoose.Document>, router: Router) {
        this.path = path;
        this.model = model;
        this.router = router;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path,this.getAll);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.patch(`${this.path}/:id`, getOwnershipMiddleware(), this.updateById);
        this.router.delete(`${this.path}/:id`, getOwnershipMiddleware(), this.deleteById);
        this.router.post(this.path, getAdminMiddleware(), this.create);
    }

    private getAll = (request: express.Request, response: express.Response) => {
        this.model.find()
            .then((results: T[]) => {
                response.json(results);
            });
    }

    private getById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const doc = await this.model.findById(id);
        if (!doc) return next(new ClothNotFoundException());
        return response.send(doc);
    }

    private updateById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("data received on patch in base controller");
        console.log(request.body)
        const id = request.params.id;
        const postData: T = request.body;
        console.log(`Trying to modify ${this.model.modelName} of id ${id}`);
        console.log("--------------- BEFORE UPDATE -------------");
        console.log(postData);
        const doc = await this.model.findByIdAndUpdate(id, postData, {new: true});
        console.log("--------------- AFTER UPDATE -------------")
        console.log(doc);
        if(!doc) return next(new ClothNotFoundException());
        return response.send(doc);
    }

    private deleteById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        console.log(`Trying to delete ${this.model.modelName} of id ${id}`);
        const success = await this.model.findByIdAndDelete(id);
        response.statusCode = 200;
        if (!success) next(new ClothNotFoundException());
        return response.send(success);
    }

    protected create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const creationData: T = request.body;
        console.log(`Trying to create a ${this.model.modelName} document. Object :`);
        console.log(creationData);
        const createdDoc = new this.model(creationData);
        const savedDoc = await createdDoc.save();
        if (!savedDoc) return next();
        return response.send(savedDoc);
    }
}

export default BaseController;
