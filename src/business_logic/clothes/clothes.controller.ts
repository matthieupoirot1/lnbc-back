import {Cloth} from './cloth.interface';
import ClothModel from './cloth.model';
import BaseController from "../base.controller";
import * as express from "express";
import ClothNotFoundException from "../../exceptions/clothes/ClothNotFoundException";
import getAdminMiddleware from "../../middlewares/admin.middleware";
const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
        cb(null, './public/images')
    },
    filename: function (req: any, file: any, cb: any) {
        console.log("handling files");
        let ext = (path.extname(file.originalname)).toLowerCase(); //get file extension
        let time = Date.now(); //get timestamp
        cb(null, 'cloth-' + time +ext);
    }
});

const upload = multer({ storage: storage })

class ClothesController extends BaseController<Cloth> {
    constructor() {
        super('/clothes', ClothModel, express.Router());
        this.router.get(this.path + "/disponible/any", this.getAllDisponible);
        this.router.get(`${this.path}/disponible/bookmarked`, this.getAllBookmarked);
        this.router.get(this.path+'/:id/toggleStatus/:status', getAdminMiddleware(), this.toggleStatus);
        this.router.post(this.path+'/addWithImage', getAdminMiddleware(), upload.array('img[]'), this.createWithImage);
        this.router.patch(this.path+'/updateWithImage/:id', getAdminMiddleware(), upload.array('img[]'), this.updateCloth);
        this.router.get(this.path+'/:clothId/image/:imagePath', getAdminMiddleware(), this.deleteClothImage);
        this.router.post(this.path+'/:clothId/image/add', getAdminMiddleware(), upload.array('img[]'), this.addImageToCloth);
    }

    private toggleStatus = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("Toggling status !");
        const id = request.params.id;
        const status = request.params.status
        const doc = await this.model.findById(id);
        if (!doc) return next(new ClothNotFoundException());
        doc.set(status, !doc.get(status))
        const savedDoc = await doc.save();
        if (!savedDoc) return next(new ClothNotFoundException());
        return response.send(savedDoc);
    }

    protected createWithImage = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("TRYING TO CREATE !")
        let data = request.body;
        data.color = data.color.split(',');
        const creationData: Cloth = data;
        creationData.imagesPath = [];
        // @ts-ignore
        request.files.forEach((file) => {
            creationData.imagesPath.push(file.filename);
        });
        console.log(`Trying to create a ${this.model.modelName} document. Object :`);
        console.log(creationData);
        console.log('--------------------------------------------------------------------------')
        const createdDoc = new this.model(creationData);
        const savedDoc = await createdDoc.save();
        if (!savedDoc) return next();
        return response.send(savedDoc);
    }

    protected updateCloth = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("Updating cloth !");
        let data = request.body;
        data.color = data.color.split(',');
        const id = request.params.id;
        const cloth = await this.model.findByIdAndUpdate(id, data, {new: true});
        if(!cloth) return next(new ClothNotFoundException());
        return response.send(cloth);
    };

    protected deleteClothImage = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("delete cloth image !");
        const idCloth = request.params.clothId;
        const imagePathToDelete = request.params.imagePath;
        const cloth = await this.model.findById(idCloth);
        if (!cloth) return next(new ClothNotFoundException());
        console.log("before :");
        console.log(cloth.imagesPath);
        cloth.imagesPath = Array.from(cloth.imagesPath.filter((imagePath) => {
            return imagePath !== imagePathToDelete;
        }));
        console.log("after :");
        console.log(cloth.imagesPath);
        //todo delete image from public/images folder
        const updatedCloth = await this.model.findByIdAndUpdate(idCloth, cloth, {new: true});
        return response.send(updatedCloth);
    }

    private addImageToCloth = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("addImageToCloth");
        const idCloth = request.params.clothId;
        const cloth = await this.model.findById(idCloth);
        if (!cloth) return next(new ClothNotFoundException());
        // @ts-ignore
        request.files.forEach((file) => {
            cloth.imagesPath.push(file.filename);
        });

        const updatedCloth = await this.model.findByIdAndUpdate(idCloth, cloth, {new: true});
        return response.send(updatedCloth);
    }

    private getAllDisponible = async (request: express.Request, response: express.Response, next: express.NextFunction) =>{
        console.log("getAllDisponible");
        const clothes = await this.model.find({disponible:true}).exec();
        return response.send(clothes);
    }

    private getAllBookmarked = async (request: express.Request, response: express.Response, next: express.NextFunction) =>{
        console.log("getAllBookmarked");
        const clothes = await this.model.find({bookmarked: true, disponible:true}).exec();
        return response.send(clothes);
    }
}

export default ClothesController;
