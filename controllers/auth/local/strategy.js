const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const { ObjectID } = require("mongodb");
const User = require("../../../models/Users");

passport.serializeUser(function (user, done) {
  console.log("serialize >>>", user),
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  console.log("DEserialize >>>", id);
  if (id.id == "undefined") {              // check if id is user{} or user.id
    const user = await User.findById(id);
    done(null, user);
  } else {
    done(null, id);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",                   // NOT <input name="username"><input name="password">
      
    },
    async (login, password, done) => {
      try {
        let user = null;
        const filter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (filter.test(login)) {
          user = await User.getUserByEmail(login);
        } else {
          user = await User.getUserByLogin(login);
        };
        console.log(user);
        if (user && User.calculateHash(password) === user.password) {
          return done(null, user); // (err, user)
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    }
  )
);

module.exports = {};
