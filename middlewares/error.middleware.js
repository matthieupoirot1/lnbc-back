"use strict";
exports.__esModule = true;
function errorMiddleware(error, request, response, next) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
        status: status,
        message: message
    });
}
exports["default"] = errorMiddleware;
