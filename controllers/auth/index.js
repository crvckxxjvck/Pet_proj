const Users = require("../../models/Users/index");
const authLocal = require("./local");
const authGoogle = require("./google");


const showLoginPage = (req, res) => {
    res.render('login');
};

const showRegistrationForm = (req, res) => {
    res.render('register');
};

const addNewUser = (req, res) => {
    let inputData = req.body;
    Users.addNewUser(inputData, function (data) {
        res.send("record was created");
        console.log("===>data", data);
    });
};

const helloPage = async (req, res) => {
    console.log('req.user', req.user);
    if (!req.user) {
      res.redirect('/')
    } else {
      let user = {};
      if (typeof req.user == 'object') {
        //Google
        user = await Users.getUserByEmail(req.user.emails[0].value);  
      } else {  
         //local
        user = await Users.getUserByID(req.user);    
      };
     console.log('> user',user); 
      if (user == null) {
        res.redirect('/');
      } else {
         res.render('hello', user );
      };
    }
  };

const showFailedPage = (req, res) => {
    res.send("You Failed to log in!");
};

const isLoggedIn = (req, res, next) => {
    // Auth middleware that checks if the user is logged in
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
};

const redirectToWelcome = (req, res) => {
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect("/auth/hello");
};


module.exports = {
    showLoginPage,
    showRegistrationForm,
    addNewUser,
    helloPage,
    showFailedPage,
    isLoggedIn,
    redirectToWelcome,

    authLocal,
    authGoogle
}
