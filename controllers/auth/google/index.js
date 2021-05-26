const passport = require('passport');
const googleStrategy = require('./strategy');


const getLogin = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};
    

const callBack = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/failed' })(req, res, next)
  };

  module.exports = {
    getLogin,
    callBack,
    strategy: {
        google: googleStrategy,
    }
  };