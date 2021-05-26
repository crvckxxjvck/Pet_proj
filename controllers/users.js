const Users = require('../models/Users');


const ShowUserProfile  = async function (req, res)   {
  if (!req.query.userid) {res.send("There must be userid parameter in request")}
  else {const user = await Users.getUserByID(req.query.userid);
  res.render('updateProfile', user)};
};


const updateUserProfile = async function (req, res) {
  let i = req.headers.referer.indexOf('=');
  let userid = req.headers.referer.slice(i+1,req.headers.referer.length );
  let obj = req.body;
  delete obj.password_confirm;
  const userLogin = await Users.findById(userid);
  obj.login = userLogin.login;
  await Users.updateUserById(userid,obj);

  res.send("ok");
};

module.exports = {
  ShowUserProfile,
  updateUserProfile
};