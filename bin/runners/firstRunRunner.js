// Этот модуль - ранер для веб сервера.
// Он запускает http сервер на express и ws сервер на socket.io
const log = require('logger').common;
// const userModel = require('models/user');
// const { access, constants } = require('fs');
const fs = require('fs')
let { photosFolder } = require('config').app;

const init = async () => {

  fs.stat(photosFolder, function (err) {
    if (err) {
      fs.mkdir(photosFolder, function () {
        console.log(`Folder ${photosFolder} created`)
      });
    }
  });

};

module.exports = init;
