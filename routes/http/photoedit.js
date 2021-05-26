const express = require('express');
const router = express.Router();
const controllers = require('controllers/photos');
const multer = require('multer');
const upload = multer();
const validator = require('../validateUpload');

// Edit photo

router.get('/:id', controllers.showPhotoInfo);

router.post('/', upload.none(), validator, controllers.updatePhotoInfoInDB);




module.exports = router;