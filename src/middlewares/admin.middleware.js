"use strict";
exports.__esModule = true;
var express = require('express');
var AdminReservedException_1 = require("../exceptions/AdminReservedException");
function getAdminMiddleware() {
    return function adminMiddleware(request, response, next) {
        if (request.client.isAdmin) {
            next();
        }
        else {
            next(new AdminReservedException_1["default"]());
        }
    };
}
exports["default"] = getAdminMiddleware;
