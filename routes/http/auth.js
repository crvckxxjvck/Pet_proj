const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const controllers = require('../../controllers/auth/index');
const validator = require('../validator');

router.get('/', controllers.showLoginPage);

router.get('/register', controllers.showRegistrationForm);

router.post('/register', upload.none(), validator, controllers.addNewUser);

router.get("/failed", controllers.showFailedPage);

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get("/good", controllers.isLoggedIn);

// Auth Routes Google
router.get("/google", controllers.authGoogle.getLogin);

router.get(
  "/google/callback",
  controllers.authGoogle.callBack,
  controllers.redirectToWelcome
);

//Auth Routes Local
router.post(
  "/local",
  upload.none(),
  controllers.authLocal.getLogin,
  controllers.authLocal.isAuth
);

router.get("/logout", controllers.authLocal.getLogout);


router.get("/hello", controllers.helloPage);

module.exports = router;