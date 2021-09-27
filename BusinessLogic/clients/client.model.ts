import * as mongoose from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');
import Client from './client.interface';

const ClientSchema = new mongoose.Schema({
  name:{type:String, required:true},
  surname:{type:String, required:true},
  email: {type: String, lowercase: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid']},
  dateOfBirth: String,
  tel: {type: String, required: true},
  hash: String,
  address: String,
  town: String,
  postalCode: String
}, {timestamps: true});
ClientSchema.plugin(uniqueValidator, {message: 'is already taken.'});

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
const ClientModel = mongoose.model<Client & mongoose.Document>('Client', ClientSchema);

export default ClientModel;
