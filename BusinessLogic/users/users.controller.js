"use strict";
exports.__esModule = true;
var express = require("express");
var UserNotFoundException_1 = require("../../exceptions/UserNotFoundException");
var user_model_1 = require("./user.model");
var EmailMissingException_1 = require("../../exceptions/EmailMissingException");
var PostsController = /** @class */ (function () {
    function PostsController() {
        var _this = this;
        this.path = '/users';
        this.router = express.Router();
        this.UserModel = user_model_1["default"];
        this.getAllUsers = function (request, response) {
            _this.UserModel.find()
                .then(function (users) {
                response.json(users);
            });
        };
        this.getUserById = function (request, response, next) {
            var id = request.params.id;
            _this.UserModel.findById(id)
                .then(function (user) {
                if (user) {
                    response.send(user);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.modifyUser = function (request, response, next) {
            var id = request.params.id;
            var postData = request.body;
            _this.UserModel.findByIdAndUpdate(id, postData, { "new": true })
                .then(function (user) {
                if (user) {
                    response.send(user);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.deleteUser = function (request, response, next) {
            var id = request.params.id;
            _this.UserModel.findByIdAndDelete(id)
                .then(function (successResponse) {
                if (successResponse) {
                    response.send(200);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.createUser = function (request, response, next) {
            var userData = request.body;
            console.log(userData);
            var createdUser = new _this.UserModel(userData);
            createdUser.save()
                .then(function (savedUser) {
                response.send(savedUser);
            })["catch"](function (reason) {
                console.log(reason);
                return next(new EmailMissingException_1["default"]());
            });
        };
        this.isEmailTaken = function (request, response, next) {
            var emailToCheck = request.body.email;
            console.log("in backend checking if email is taken : " + emailToCheck);
            _this.UserModel.findOne({ email: emailToCheck }, function (err, user) {
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
    PostsController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + "/:id", this.getUserById);
        this.router.patch(this.path + "/:id", this.modifyUser);
        this.router["delete"](this.path + "/:id", this.deleteUser);
        this.router.post(this.path, this.createUser);
        this.router.post(this.path + '/email', this.isEmailTaken);
    };
    return PostsController;
}());
exports["default"] = PostsController;
