"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var authentication_controller_1 = require("./authentication/authentication.controller");
var clients_controller_1 = require("./BusinessLogic/clients/clients.controller");
var app = new app_1["default"]([
    new clients_controller_1["default"](),
    //todo authentication and clients controller works. Now check authentication middleware
    new authentication_controller_1["default"]()
]);
app.listen();
