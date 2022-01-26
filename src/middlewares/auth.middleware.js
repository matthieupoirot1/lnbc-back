"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var AuthenticationTokenMissingException_1 = require("../exceptions/AuthenticationTokenMissingException");
var WrongAuthenticationTokenException_1 = require("../exceptions/WrongAuthenticationTokenException");
var client_model_1 = require("../business_logic/clients/client.model");
function getAuthMiddleware(excludedRoutes) {
    return function authMiddleware(request, response, next) {
        for (var _i = 0, excludedRoutes_1 = excludedRoutes; _i < excludedRoutes_1.length; _i++) {
            var excludedRoute = excludedRoutes_1[_i];
            console.log(request.originalUrl.includes(excludedRoute));
            if (request.originalUrl.includes(excludedRoute)) {
                return next();
            }
        }
        if (!request.header("Authorization"))
            return next(new AuthenticationTokenMissingException_1["default"]());
        var token = request.header("Authorization");
        console.log("confronting token's id with server id : \n =======>");
        console.log(token);
        var secret = process.env.JWT_SECRET || "1785ec309aa83a12251f9c2fc872b9b4e1d2f7d0";
        jwt.verify(token, secret, function (err, payload) {
            var _a;
            console.log("decoding token sent. Err ? => " + err);
            if (err && err.name.includes('Expired'))
                return next(new WrongAuthenticationTokenException_1["default"](true));
            if (err)
                return next(new WrongAuthenticationTokenException_1["default"]());
            console.log("got id : " + (payload === null || payload === void 0 ? void 0 : payload._id));
            var id = (_a = payload === null || payload === void 0 ? void 0 : payload._id) !== null && _a !== void 0 ? _a : "error";
            // @ts-ignore
            client_model_1["default"].findById(id, function (err, user) {
                if (err || !user)
                    return next(new WrongAuthenticationTokenException_1["default"]());
                console.log("found user : " + user);
                request.client = user;
                next();
            });
        });
    };
}
exports["default"] = getAuthMiddleware;
