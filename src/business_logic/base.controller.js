"use strict";
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
var admin_middleware_1 = require("../middlewares/admin.middleware");
var ClothNotFoundException_1 = require("../exceptions/clothes/ClothNotFoundException");
var ownership_middleware_1 = require("../middlewares/ownership.middleware");
var BaseController = /** @class */ (function () {
    function BaseController(path, model, router) {
        var _this = this;
        this.path = '';
        this.getAll = function (request, response) {
            _this.model.find()
                .then(function (results) {
                response.json(results);
            });
        };
        this.getById = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        doc = _a.sent();
                        if (!doc)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        return [2 /*return*/, response.send(doc)];
                }
            });
        }); };
        this.updateById = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, postData, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("data received on patch in base controller");
                        console.log(request.body);
                        id = request.params.id;
                        postData = request.body;
                        console.log("Trying to modify " + this.model.modelName + " of id " + id);
                        console.log("--------------- BEFORE UPDATE -------------");
                        console.log(postData);
                        return [4 /*yield*/, this.model.findByIdAndUpdate(id, postData, { "new": true })];
                    case 1:
                        doc = _a.sent();
                        console.log("--------------- AFTER UPDATE -------------");
                        console.log(doc);
                        if (!doc)
                            return [2 /*return*/, next(new ClothNotFoundException_1["default"]())];
                        return [2 /*return*/, response.send(doc)];
                }
            });
        }); };
        this.deleteById = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        console.log("Trying to delete " + this.model.modelName + " of id " + id);
                        return [4 /*yield*/, this.model.findByIdAndDelete(id)];
                    case 1:
                        success = _a.sent();
                        response.statusCode = 200;
                        if (!success)
                            next(new ClothNotFoundException_1["default"]());
                        return [2 /*return*/, response.send(success)];
                }
            });
        }); };
        this.create = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var creationData, createdDoc, savedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        creationData = request.body;
                        console.log("Trying to create a " + this.model.modelName + " document. Object :");
                        console.log(creationData);
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
        this.path = path;
        this.model = model;
        this.router = router;
        this.initializeRoutes();
    }
    BaseController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path + "/:id", this.getById);
        this.router.patch(this.path + "/:id", (0, ownership_middleware_1["default"])(), this.updateById);
        this.router["delete"](this.path + "/:id", (0, ownership_middleware_1["default"])(), this.deleteById);
        this.router.post(this.path, (0, admin_middleware_1["default"])(), this.create);
    };
    return BaseController;
}());
exports["default"] = BaseController;
