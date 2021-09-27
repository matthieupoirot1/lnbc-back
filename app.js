"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var error_middleware_1 = require("./middlewares/error.middleware");
var log_middleware_1 = require("./middlewares/log.middleware");
var auth_middleware_1 = require("./middlewares/auth.middleware");
var cors = require('cors');
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = express();
        this.app.use(cors({ origin: '*',
            credentials: true }));
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    App.prototype.listen = function () {
        console.log("||| **** LOADING SERV **** |||");
        this.app.listen(3000, function () {
            console.log("APP LISTENING AT 3000");
        });
    };
    App.prototype.initializeMiddlewares = function () {
        this.app.use(log_middleware_1["default"]);
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use((0, auth_middleware_1["default"])(["/auth/register", "/auth/connexion", "/clients/email"]));
    };
    App.prototype.initializeErrorHandling = function () {
        this.app.use(error_middleware_1["default"]);
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.connectToTheDatabase = function () {
        mongoose.connect("mongodb://localhost:27017").then(function () {
            console.log("||| **** CONNECTED TO DB ON : mongodb://localhost:37017test **** |||");
        })["catch"](function (reason) {
            console.log(reason);
        });
        mongoose.connection.on('error', console.error.bind(console, 'connection-page error'));
        mongoose.connection.once('open', function () {
            console.log("connected to bd !");
        });
    };
    return App;
}());
exports["default"] = App;
