const path = require('path');
const mongoose = require('mongoose');
const generalSchema = require('./schema');

generalSchema.statics.getAllPhotos = async function () {
  const photos = await this.find();
  return photos;
};

generalSchema.statics.getNameAllPhotosFromDb = async function () {
  let names = await this.find({}, 'filename');
  return names;
};

generalSchema.statics.getPhotosByRating = async function (from, to) {
  return this.find({ rate: { artistic: { $gt: from, $lt: to } } })
    .then(r => {
      return r;
    })
    .catch(err => {
      console.log(err);
      return `Error ${err}`;
    })
}

generalSchema.statics.deletePhotoById = async function (id) {
  return this.findOneAndDelete({ _id: id })
    .then(r => {
      return r;
    })
    .catch(err => {
      console.log(err);
      return `Error ${err}`;
    })
}

generalSchema.statics.deletePhotoByName = async function (name) {
  return this.findOneAndDelete({ filename: name })
    .then(r => {
      return r;
    })
    .catch(err => {
      console.log(err);
      return `Error ${err}`;
    })
}

generalSchema.statics.getPhotosByDate = async function (from, to) {
  const photos = await this.find({ loaddate: { $gte: from, $lte: to } }).exec();
  return photos;
};


generalSchema.statics.getPhotosByTitle = async function (title) {
  const photo = await this.find({ title: { $regex: title, $options: '/[\w\u0430-\u044f]+/ig' } });
  return photo;
};

generalSchema.statics.getPhotosByTag = async function (tag) {
  const photos = await this.find({ tag: tag }).exec();
  return photos;
};

generalSchema.statics.getPhotosByTagSimilar = async function (data) {
  const photos = await this.find({ tags: { $regex: data, $options: 'i' } }).exec();
  return photos;
};

generalSchema.statics.getPhotoById = async function (id) {
  const photo = await this.findOne({ _id: id }).exec();
  return photo;
};


generalSchema.statics.updatePhotoById = async function (obj) {
  let photoInfo = await this.getPhotoById(obj.id);
  photoInfo.title = obj.title;
  photoInfo.tags = obj.tags.split(', ')
  await photoInfo.save();
}

generalSchema.statics.addNewPhoto = function (obj) {
  const newPhoto = new this({
    title: obj.title,
    filename: obj.filename, // в контроллерах будет генерироваться путь
    author: obj.user,
    loaddate: obj.loaddate, // в контроллерах будет генерироваться время с помощью момент
    tags: obj.tags, // не забыть что это массив тегов
    exif: {
      makedate: obj.makedate, // в контроллерах будет генерироваться время с помощью момент
      hardwarebrend: obj.hardwarebrend,
      hardwaremodel: obj.hardwaremodel,
    },
    rate: {
      artistic: '0',
      originally: '0',
      technical: '0',
      like: '0',
      dislike: '0',
    },
    comments: [],
    views: 0,
  });
  newPhoto.save();
}

// ObjectId("605e0d8297b7cb42d4927f10")
const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);
module.exports = model;