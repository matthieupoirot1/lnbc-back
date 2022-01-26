"use strict";
exports.__esModule = true;
var app_1 = require("./src/app");
var authentication_controller_1 = require("./authentication/authentication.controller");
var clients_controller_1 = require("./business_logic/clients/clients.controller");
var clothes_controller_1 = require("./business_logic/clothes/clothes.controller");
var app = new app_1["default"]([
    new clients_controller_1["default"](),
    new clothes_controller_1["default"](),
    new authentication_controller_1["default"]()
]);
app.listen();
