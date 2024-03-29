"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt = require("bcrypt");
var express = require("express");
var UserWithSameEmailException_1 = require("../exceptions/UserWithSameEmailException");
var WrongCredentialsException_1 = require("../exceptions/WrongCredentialsException");
var client_model_1 = require("../business_logic/clients/client.model");
var jwt = require("jsonwebtoken");
var RequiredFieldsException_1 = require("../exceptions/RequiredFieldsException");
var UserNotFoundException_1 = require("../exceptions/UserNotFoundException");
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
        var _this = this;
        this.path = '/auth';
        this.router = express.Router();
        this.registration = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData, hashedPassword, user, userPOJO, tokenData, userToSend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("----- IN REGISTRATION");
                        userData = request.body;
                        console.log(request.body);
                        return [4 /*yield*/, client_model_1["default"].findOne({ email: userData.email })];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/, next(new UserWithSameEmailException_1["default"](userData.email))];
                        return [4 /*yield*/, bcrypt.hash(userData.hash, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        console.log(userData);
                        return [4 /*yield*/, client_model_1["default"].create(__assign(__assign({}, userData), { hash: hashedPassword }))["catch"](function (reason) {
                                console.log(typeof reason);
                                console.log("ERROR CREATING USER" + reason);
                                return next(new RequiredFieldsException_1["default"](Object.keys(reason.errors)));
                            })];
                    case 3:
                        user = _a.sent();
                        if (user) {
                            userPOJO = user.toObject();
                            userPOJO.hash = "";
                            tokenData = this.createToken(userPOJO);
                            userToSend = __assign(__assign({}, userPOJO), { token: tokenData });
                            response.send(userToSend);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.loggingIn = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var logInData, user, isPasswordMatching, tokenData, userPOJO, userToSend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logInData = request.body;
                        return [4 /*yield*/, client_model_1["default"].findOne({ email: logInData.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(logInData.hash, user.hash)];
                    case 2:
                        isPasswordMatching = _a.sent();
                        if (isPasswordMatching) {
                            user.hash = "";
                            tokenData = this.createToken(user);
                            console.log("USER POJO");
                            userPOJO = user.toObject();
                            console.log(userPOJO);
                            userToSend = __assign(__assign({}, userPOJO), { token: tokenData });
                            response.send(userToSend);
                        }
                        else {
                            return [2 /*return*/, next(new WrongCredentialsException_1["default"]())];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, next(new UserNotFoundException_1["default"]())];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    AuthenticationController.prototype.initializeRoutes = function () {
        this.router.post(this.path + "/register", this.registration);
        this.router.post(this.path + "/login", this.loggingIn);
    };
    AuthenticationController.prototype.createCookie = function (tokenData) {
        return "Authorization=" + tokenData.token + "; HttpOnly; Max-Age=" + tokenData.expiresIn;
    };
    AuthenticationController.prototype.createToken = function (user) {
        var expiresIn = 60 * 60; // an hour
        var secret = process.env.JWT_SECRET || "1785ec309aa83a12251f9c2fc872b9b4e1d2f7d0";
        var dataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn: expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn: expiresIn })
        };
    };
    return AuthenticationController;
}());
exports["default"] = AuthenticationController;
