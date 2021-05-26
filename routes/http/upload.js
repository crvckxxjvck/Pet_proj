const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/auth/index');
const photosControllers = require('../../controllers/photos');
const multer  = require('multer');
const validator = require('../validateUpload');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'photos/')
  },
  filename: function (req, file, cb) {
    let newName =`${Date.now()}-${file.originalname}`;
    cb(null, newName);
  }
})

const upload = multer({ storage: storage })


router.get('/', authControllers.isLoggedIn , photosControllers.showUploadPage);

router.post('/', upload.single('dowloads'), validator, photosControllers.savePhotoInfo, photosControllers.readExif);

module.exports = router;