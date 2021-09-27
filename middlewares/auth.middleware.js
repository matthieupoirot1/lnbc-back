"use strict";
exports.__esModule = true;
var express = require('express');
var jwt = require("jsonwebtoken");
var AuthenticationTokenMissingException_1 = require("../exceptions/AuthenticationTokenMissingException");
var WrongAuthenticationTokenException_1 = require("../exceptions/WrongAuthenticationTokenException");
var user_model_1 = require("../BusinessLogic/users/user.model");
function getAuthMiddleware(excludeRoutes) {
    return function authMiddleware(request, response, next) {
        if (excludeRoutes.includes(request.originalUrl)) {
            next();
        }
        else {
            console.log("heyyyyy");
            var cookies = request.cookies;
            if (cookies && cookies.Authorization) {
                var secret = process.env.JWT_SECRET || "HEYHEYANTHOMATTHNANANA";
                var verificationResponse = jwt.verify(cookies.Authorization, secret);
                var id = verificationResponse._id;
                var user = user_model_1["default"].findById(id).then(function (user) {
                    if (user) {
                        //request.user = user;
                        next();
                    }
                    else {
                        next(new WrongAuthenticationTokenException_1["default"]());
                    }
                })["catch"](function () {
                    next(new WrongAuthenticationTokenException_1["default"]());
                });
            }
            else {
                next(new AuthenticationTokenMissingException_1["default"]());
            }
        }
    };
}
exports["default"] = getAuthMiddleware;
