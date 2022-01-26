"use strict";
exports.__esModule = true;
var express = require('express');
var WrongAuthenticationTokenException_1 = require("../exceptions/WrongAuthenticationTokenException");
function getOwnershipMiddleware() {
    return function ownershipMiddleware(request, response, next) {
        if (request.client.id == request.params.id || request.client.isAdmin) {
            next();
        }
        else {
            next(new WrongAuthenticationTokenException_1["default"]());
        }
    };
}
exports["default"] = getOwnershipMiddleware;
