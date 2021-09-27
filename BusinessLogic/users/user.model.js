"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    image: String,
    hash: String,
    name: String,
    surname: String,
    company: String
}, { timestamps: true });
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });
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
var UserModel = mongoose.model('User', UserSchema);
exports["default"] = UserModel;
