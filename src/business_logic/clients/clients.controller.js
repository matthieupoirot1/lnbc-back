"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var express = require("express");
var client_model_1 = require("./client.model");
var base_controller_1 = require("../base.controller");
var ClientsController = /** @class */ (function (_super) {
    __extends(ClientsController, _super);
    function ClientsController() {
        var _this = _super.call(this, '/clients', client_model_1["default"], express.Router()) || this;
        _this.isEmailTaken = function (request, response, next) {
            var emailToCheck = request.body.email;
            console.log("in backend checking if email is taken : " + emailToCheck);
            client_model_1["default"].findOne({ email: emailToCheck }, function (err, user) {
                if (err)
                    return console.log(err);
                if (user) {
                    console.log("in backend email is taken : " + emailToCheck);
                    response.send(true);
                }
                else {
                    console.log("in backend email is NOT taken : " + emailToCheck);
                    response.send(false);
                }
            });
        };
        _this.router.post(_this.path + '/email', _this.isEmailTaken);
        return _this;
    }
    return ClientsController;
}(base_controller_1["default"]));
exports["default"] = ClientsController;
