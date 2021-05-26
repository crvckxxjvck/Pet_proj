const passport = require('passport');
const localStrategy = require('./strategy');

const getLogin = (req, res, next) => { 
    console.log('>>> getLogin');
   
    passport.authenticate('local', function(err, user) {
        let resp = { isValid: false, message: "" };
      if (err) { return next(err); }
      if (!user) { 
        resp.message =  'incorrect login, email or password!'; 
          res.send(resp);
        }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        resp.isValid = true;
        resp.name = user.name;
        resp.surname = user.surname;
        res.send(resp);
      });
    })(req, res, next);
  };
const isAuth = (req, res, next) => {
    console.log('>>> isAuth');
    if (req.isAuthenticated()) {
       console.log('>>>>>>>>>',req.isAuthenticated());
      next();
    } else {
      return res.redirect('/');
    }
  }
  
  const getLogout = (req, res) => {
    console.log('>>> getLogout');
    req.session.destroy((err) => {   // delete session from db immediately
      if (err) {
        console.log(err);
      }
    req.logOut();
    res.redirect('/auth'); // ----тимчасово переходимо на login-page до розробки homepage
  });
};
  
  module.exports = {
    getLogin,
    getLogout,
    isAuth,
    strategy: {
      local: localStrategy,
    }
  };