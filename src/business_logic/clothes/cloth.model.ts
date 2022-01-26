import * as mongoose from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');
import {Cloth, ColorEnum, ClothEnum} from './cloth.interface';
import {Schema} from "mongoose";

const ClothSchema = new mongoose.Schema({
    name:{type:String, required:true},
    type:{type:String, required:true, enum : ClothEnum,},
    qte: {type: String, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    color:{type: [String], required:true, enum: ColorEnum},
    disponible:{type: mongoose.Schema.Types.Boolean, required: true, default: true},
    bookmarked:{type: mongoose.Schema.Types.Boolean, required: true, default: false},
    promoPrice:{type: Number, required: true, default: 0},
    imagesPath:[{type: String}]
}, {timestamps: true});

const ClothModel = mongoose.model<Cloth & mongoose.Document>('Clothes', ClothSchema);

export default ClothModel;