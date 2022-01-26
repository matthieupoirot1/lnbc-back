"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var cloth_interface_1 = require("./cloth.interface");
var ClothSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, "enum": cloth_interface_1.ClothEnum },
    qte: { type: String, required: true, "default": 0 },
    price: { type: Number, required: true, "default": 0 },
    color: { type: [String], required: true, "enum": cloth_interface_1.ColorEnum },
    disponible: { type: mongoose.Schema.Types.Boolean, required: true, "default": true },
    bookmarked: { type: mongoose.Schema.Types.Boolean, required: true, "default": false },
    promoPrice: { type: Number, required: true, "default": 0 },
    imagesPath: [{ type: String }]
}, { timestamps: true });
var ClothModel = mongoose.model('Clothes', ClothSchema);
exports["default"] = ClothModel;
