"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
    dateOfBirth: String,
    tel: { type: String, required: true },
    hash: String,
    address: String,
    town: String,
    postalCode: String,
    isAdmin: mongoose.Schema.Types.Boolean
}, { timestamps: true });
ClientSchema.plugin(uniqueValidator, { message: 'is already taken.' });
/*UserModel.pre('save', function (next:HookNextFunction){
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      next();
    });
  });
});

UserModel.methods.comparePassword = function (toCompare, done) {
  bcrypt.compare(toCompare, this.password, (err, isMatch) => {
    if (err) done(err);
    else done(err, isMatch);
  });
};*/
var ClientModel = mongoose.model('Client', ClientSchema);
exports["default"] = ClientModel;
