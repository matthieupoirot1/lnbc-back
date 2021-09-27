"use strict";
exports.__esModule = true;
var express = require("express");
var UserNotFoundException_1 = require("../../exceptions/UserNotFoundException");
var client_model_1 = require("./client.model");
//import { nextTick } from 'process';
//import EmailMissingException from '../../exceptions/EmailMissingException';
var ClientsController = /** @class */ (function () {
    function ClientsController() {
        this.path = '/clients';
        this.router = express.Router();
        this.ClientModel = client_model_1["default"];
        this.getAllClients = function (request, response) {
            client_model_1["default"].find()
                .then(function (clients) {
                response.json(clients);
            });
        };
        this.getClientById = function (request, response, next) {
            var id = request.params.id;
            client_model_1["default"].findById(id)
                .then(function (client) {
                if (client) {
                    response.send(client);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.modifyClient = function (request, response, next) {
            var id = request.params.id;
            var postData = request.body;
            client_model_1["default"].findByIdAndUpdate(id, postData, { "new": true })
                .then(function (client) {
                if (client) {
                    response.send(client);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.deleteClient = function (request, response, next) {
            var id = request.params.id;
            client_model_1["default"].findByIdAndDelete(id)
                .then(function (successResponse) {
                if (successResponse) {
                    response.send(200);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.createClient = function (request, response, next) {
            var clientData = request.body;
            console.log(clientData);
            var createdClient = new client_model_1["default"](clientData);
            createdClient.save()
                .then(function (savedClient) {
                response.send(savedClient);
            })["catch"](function (reason) {
                console.log(reason);
                return next();
            });
        };
        this.isEmailTaken = function (request, response, next) {
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
        this.initializeRoutes();
    }
    ClientsController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllClients);
        this.router.get(this.path + "/:id", this.getClientById);
        this.router.patch(this.path + "/:id", this.modifyClient);
        this.router["delete"](this.path + "/:id", this.deleteClient);
        this.router.post(this.path, this.createClient);
        this.router.post(this.path + '/email', this.isEmailTaken);
    };
    return ClientsController;
}());
exports["default"] = ClientsController;
