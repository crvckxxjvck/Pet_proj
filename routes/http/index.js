const express = require('express');
const router = express.Router();
const indexControllers = require('../../controllers');
const userControllers = require('../../controllers/users');
const multer = require('multer');
const upload = multer();
const validator = require('../validator');



router.get('/', indexControllers.showIndexPage);



router.get('/profile', userControllers.ShowUserProfile );

router.post('/profile' , upload.none(), validator, userControllers.updateUserProfile );


module.exports = router;