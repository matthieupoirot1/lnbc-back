"use strict";
exports.__esModule = true;
function logMiddleware(request, response, next) {
    var currentDateTime = new Date(Date.now());
    var date = currentDateTime.getDate();
    var month = currentDateTime.getMonth() + 1;
    var year = currentDateTime.getFullYear();
    console.log('Recu a :', year + "-" + month + "-" + date, "=========> " + request.originalUrl);
    next();
}
exports["default"] = logMiddleware;
