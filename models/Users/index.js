const path = require("path");
const mongoose = require("mongoose");
const generalSchema = require("./schema");
const crypto = require("crypto");

// ----- for calculate Hash
const { saltHash } = require('config').app;
//const secret = saltHash;
const calculateHash = function (passw) {
  return crypto.createHash("sha256", { saltHash }).update(passw).digest("hex");
};

generalSchema.statics.getAllUsers = async function () {
  return this.find()
  .then((r) => {
    return r;
  })
  .catch((err) => {
    console.log(err);
    return err;
  })

};

generalSchema.statics.getUserByID = async function (id) {
  return this.findOne({ _id: id })
    .then((r) => {
      console.log(r);
      return r;
    })
    .catch((err) => {
      console.log(err);
      return `Error ${err}`;
    });
};

generalSchema.statics.getUserByLogin = async function (login) {
  return this.findOne({ "login": login })
    .then((r) => {
      console.log(r);
      return r;
    })
    .catch((err) => {
      console.log(err);
      return `Error ${err}`;
    });
};

generalSchema.statics.getUserByLoginSimilar = async function(data) {
  const user = await this.find({ "login": { $regex: data, $options: 'i' }});
  return user;
};

generalSchema.statics.getUserByEmail = async function(email) {
  const user = await this.findOne({ "mail": email});
  return user;
};

generalSchema.statics.getUsersByStatus = async function (from, to) {
  const users = await this.find({ status: { $gte: from, $lte: to } }).exec();
  return users;
}

generalSchema
  .virtual("userpass")
  .get(function () {
    console.log("no data");
  })
  .set(function (pass) {
    this.password = calculateHash(pass);
    console.log("hash saved");
  });

// ----- calculate Hash
generalSchema.statics.calculateHash = function (pass) {
  return calculateHash(pass);
};


generalSchema.statics.addNewUser = function (obj, cb) {
  const newUser = new this({
    name: obj.name,
    surname: obj.surname,
    login: obj.login,
    userpass: obj.password, // пароль схеширован по виртуальному имени userpass
    mail: obj.mail,
    telephone: obj.telephone,
    dateBirthday: obj.dateBirthday,
    status: 0,
  });
  newUser.save(function (err, data) {
    if (err) throw err;
    return cb(newUser);
  });
};

generalSchema.statics.updateUserById = async function (id, obj) {
  await this.findOneAndReplace({ _id: id }, obj);
  const user = await this.getUserByID(id);
  user.password = calculateHash(obj.password);
  user.save();
};

const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
