"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cloth_model_1 = require("./cloth.model");
var base_controller_1 = require("../base.controller");
var express = require("express");
var ClothNotFoundException_1 = require("../../exceptions/clothes/ClothNotFoundException");
var admin_middleware_1 = require("../../middlewares/admin.middleware");
var path = require('path');
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        var ext = (path.extname(file.originalname)).toLowerCase(); //get file extension
        var time = Date.now(); //get timestamp
        cb(null, 'cloth-' + time + ext);
    }
});
var upload = multer({ storage: storage });
var ClothesController = /** @class */ (function (_super) {
    __extends(ClothesController, _super);
    function ClothesController() {
        var _this = _super.call(this, '/clothes', cloth_model_1["default"], express.Router()) || this;
        _this.toggleStatus = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, status, doc, savedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        status = request.params.status;
                        return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        doc = _a.sent();
                        if (!doc)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        doc.set(status, !doc.get(status));
                        return [4 /*yield*/, doc.save()];
                    case 2:
                        savedDoc = _a.sent();
                        if (!savedDoc)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        return [2 /*return*/, response.send(savedDoc)];
                }
            });
        }); };
        _this.createWithImage = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, creationData, createdDoc, savedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("TRYING TO CREATE !");
                        data = request.body;
                        data.color = data.color.split(',');
                        creationData = data;
                        creationData.imagesPath = [];
                        // @ts-ignore
                        request.files.forEach(function (file) {
                            creationData.imagesPath.push(file.filename);
                        });
                        console.log("Trying to create a " + this.model.modelName + " document. Object :");
                        console.log(creationData);
                        console.log('--------------------------------------------------------------------------');
                        createdDoc = new this.model(creationData);
                        return [4 /*yield*/, createdDoc.save()];
                    case 1:
                        savedDoc = _a.sent();
                        if (!savedDoc)
                            return [2 /*return*/, next()];
                        return [2 /*return*/, response.send(savedDoc)];
                }
            });
        }); };
        _this.updateCloth = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, id, cloth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Updating cloth !");
                        data = request.body;
                        data.color = data.color.split(',');
                        id = request.params.id;
                        return [4 /*yield*/, this.model.findByIdAndUpdate(id, data, { "new": true })];
                    case 1:
                        cloth = _a.sent();
                        if (!cloth)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        return [2 /*return*/, response.send(cloth)];
                }
            });
        }); };
        _this.deleteClothImage = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var idCloth, imagePathToDelete, cloth, updatedCloth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Updating cloth !");
                        idCloth = request.params.clothId;
                        imagePathToDelete = request.params.imagePath;
                        return [4 /*yield*/, this.model.findById(idCloth)];
                    case 1:
                        cloth = _a.sent();
                        if (!cloth)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        console.log("before :");
                        console.log(cloth.imagesPath);
                        cloth.imagesPath = Array.from(cloth.imagesPath.filter(function (imagePath) {
                            return imagePath !== imagePathToDelete;
                        }));
                        console.log("after :");
                        console.log(cloth.imagesPath);
                        return [4 /*yield*/, this.model.findByIdAndUpdate(idCloth, cloth, { "new": true })];
                    case 2:
                        updatedCloth = _a.sent();
                        return [2 /*return*/, response.send(updatedCloth)];
                }
            });
        }); };
        _this.addImageToCloth = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var idCloth, cloth, updatedCloth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idCloth = request.params.clothId;
                        return [4 /*yield*/, this.model.findById(idCloth)];
                    case 1:
                        cloth = _a.sent();
                        if (!cloth)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        // @ts-ignore
                        request.files.forEach(function (file) {
                            cloth.imagesPath.push(file.filename);
                        });
                        return [4 /*yield*/, this.model.findByIdAndUpdate(idCloth, cloth, { "new": true })];
                    case 2:
                        updatedCloth = _a.sent();
                        return [2 /*return*/, response.send(updatedCloth)];
                }
            });
        }); };
        _this.router.get(_this.path + '/:id/toggleStatus/:status', (0, admin_middleware_1["default"])(), _this.toggleStatus);
        _this.router.post(_this.path + '/addWithImage', (0, admin_middleware_1["default"])(), upload.array('img[]'), _this.createWithImage);
        _this.router.patch(_this.path + '/updateWithImage/:id', (0, admin_middleware_1["default"])(), upload.array('img[]'), _this.updateCloth);
        _this.router.get(_this.path + '/:clothId/image/:imagePath', (0, admin_middleware_1["default"])(), _this.deleteClothImage);
        _this.router.post(_this.path + '/:clothId/image/add', (0, admin_middleware_1["default"])(), upload.array('img[]'), _this.addImageToCloth);
        return _this;
    }
    return ClothesController;
}(base_controller_1["default"]));
exports["default"] = ClothesController;
