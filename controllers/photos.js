const Users = require('../models/Users');
const Photos = require('../models/Photos');
const exifReader = require('exifr');
const fs = require('fs');
const moment = require('moment');

const showUploadPage = (req, res) => {
  res.render('upload');
}

const savePhotoInfo = async (req, res, next) => {
  const tempObj = {
    title: req.body.title,
    filename: req.file.filename,
    user: req.session.passport.user,
    loaddate: moment().format('DD.MM.YYYY HH:mm:ss'),
    tags: req.body.tags.split(', '),
    makedate:  null, 
    hardwarebrend:  null,
    hardwaremodel:  null,
  };
  await Photos.addNewPhoto(tempObj);
  next();
}

const readExif =  (req, res) => {  // читаем метаданные фото с хранилища, обновляем ими запись о фотке в базе.
  fs.readFile(req.file.path,   async function (error, data) {
    let tags = await exifReader.parse(data);
    const makedate = tags.CreateDate ? tags.CreateDate : null;
    const hardwarebrend = tags.Make ? tags.Make : null;
    const hardwaremodel = tags.Model ? tags.Model : null;
    const updatedPhoto =   await Photos.findOne({ "filename": req.file.filename });
    updatedPhoto.exif = { makedate: makedate, hardwarebrend: hardwarebrend, hardwaremodel: hardwaremodel };
    updatedPhoto.save();
  });
  res.send("Photo saved");
}


const showPhotoInfo = async (req, res) => {
  const photoInfo = await Photos.getPhotoById(req.params.id);
  const photoObj = {
    title: photoInfo.title,
    tagsStr: photoInfo.tags.reduce((str, el) => `${str} ${el},`, ''),
    id: photoInfo._id,
  }
  res.render('photoedit', { photoObj });
}

const updatePhotoInfoInDB = async (req, res) => {
  await Photos.updatePhotoById(req.body)
  res.send("Photo info updated");
}

module.exports = {
  showUploadPage,
  readExif,
  showPhotoInfo,
  updatePhotoInfoInDB,
  savePhotoInfo,
}