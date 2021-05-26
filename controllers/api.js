const fs = require('fs').promises
const { photosFolder } = require('config').app
const Photos = require('models/Photos')
const Users = require("models/Users");

// --  /api/checkdb  - functionality

const showMismatchedData = async (req, res) => {
  let data = await compareData()
  res.send(data);
};

const getNameAllPhotosFromStorage = (path) => {
  return fs.readdir(path, (err, file) => {
    if (err) console.log(err)
    return file
  })
};

const compareData = async () => {
  let filesNamesFromFolder = await getNameAllPhotosFromStorage(photosFolder);
  let filesNamesFromDb = await Photos.getNameAllPhotosFromDb()
    .then(r => r.map(elem => elem.filename));
  let lostPhotos = filesNamesFromFolder.filter(item => !filesNamesFromDb.includes(item));
  let lostDbDocuments = filesNamesFromDb.filter(item => !filesNamesFromFolder.includes(item));

  return { lostDbDocuments, lostPhotos };
};

// --  /api/fixdb  - functionality

const deletePhotoFilesFromLocalStorage = async (req, res, next) => {
  let arr = (await compareData()).lostPhotos
  if (arr.length !== 0) {
    arr.forEach((elem) => {
      let path = photosFolder + '/' + elem
      return fs.unlink(path, (err) => {
        if (err) console.log(err)
      })
    })
    res.storage = { "nextPhotosDeleted": arr, "status": "success" }
    next()
  } else {
    res.storage = { "status": "All files syncd" }
    next()
  }
}

const deletePhotoDocumentsFromDb = async (req, res, next) => {
  let arr = (await compareData()).lostDbDocuments
  if (arr.length !== 0) {
    arr.forEach(async (elem) => {
      await Photos.deletePhotoByName(elem)
    })
    res.db = { "nextDocumentsDeletedFromDb": arr, "status": "success" }
    next()
  } else {
    res.db = { "status": "All documents syncd" }
    next()
  }
}

const showPhotosDeleteResult = (req, res, next) => {
  let data = {
    storage: res.storage,
    db: res.db
  };
  res.send(data)
}

// --  /api/userLogin  - functionality

const getUserByLogin = async (req, res) => {
  try {
    const users = await Users.getUserByLoginSimilar(req.query.login);
    if (users.length == 0) {
      return res.json({ status: "success", message: "Not found" });
    }
    return res.json({ status: "success", data: users });
  } catch {
    return res.json({ status: "error", message: "API format: /api/userLogin?login=...<login>..." });
  }
};

// --  /api/photosDate  - functionality

const showPhotosByDate = async (req, res) => {
  let data = await Photos.getPhotosByDate(req.query.from, req.query.to)
  if (data.length === 0) data.push({
    status: "Error",
    message: "No files for that period"
  })
  res.send(data)
}

const getUserByID = async function (req, res) {
  if (!req.query.id) {
    res.json({
      status: "error",
      message: "There must be id parameter in request"
    })
  }
  else {
    const user = await Users.getUserByID(req.query.id);
    if (!user._id) {
      res.json({
        status: "error",
        message: "User not found",
      })
    }
    else { res.json(user) }
  };
};

const getAllPhotos = async function (req, res) {
  const photos = await Photos.find({});
  res.json(photos);
}

// --  /api/users  - functionality

const getAllUsers = async (req, res) => {
  const allUsersFromDB = await Users.getAllUsers();
  res.send(allUsersFromDB);
};

//get photos by similar tag 
const getPhotosByTagSimilar = async (req, res) => {

  if (!req.query.tag) {
    return res.json({
      status: "Error",
      message: "Not enough data (need 'tag=...')",
    })
  }

  const photos = await Photos.getPhotosByTagSimilar(req.query.tag);

  if (photos.length <= 0) {
    res.json({
      status: "error",
      message: "Not found",
    });
  } else {
    res.json(photos);
  }
};

const getPhotosByTitle = async (req, res) => {
  try {
    const photo = await Photos.getPhotosByTitle(req.query.title);
    if (photo.length == 0) {
      return res.json({ status: "success", message: "Not found" });
    }
    return res.json({ status: "success", data: photo });
  } catch {
    return res.json({ status: "error", message: "API format: /api/photosTitle?title=...<name title>..." });
  }

};

const getUserByEmail = async (req, res) => {

  const user = await Users.getUserByEmail(req.query.email);

  if (!req.query.email) {
    res.json({
      status: "Error",
      message: "Not enough data (need 'email=...')"
    })
  } else if (!user) {
    res.json({
      status: "Error",
      message: "User not found"
    });
  } else {
    res.json(user);
  }

}

const getUsersByStatus = async (req, res) => {
  const users = await Users.getUsersByStatus(req.query.from, req.query.to);
  // console.log(users);

  if (!req.query.from || !req.query.to) {
    res.json({
      status: "Error",
      message: "Not enough data (need 'form=...&to=...')",
    })
  } else if (users.length == 0) {
    res.json({
      status: "Error",
      message: "Users not found"
    });
  }
  else {
    res.json(users);
  }
}

const getPhotoById = async (req, res) => {
  let photos = await Photos.getPhotoById(req.query.id)
  if (!photos) photos = {
    status: "Error",
    message: "Photos not found"
  }
  res.send(photos)
}


module.exports = {
  showMismatchedData,
  deletePhotoDocumentsFromDb,
  deletePhotoFilesFromLocalStorage,
  showPhotosDeleteResult,
  getUserByLogin,
  showPhotosByDate,
  getUserByID,
  getAllPhotos,
  getAllUsers,
  getPhotosByTagSimilar,
  getPhotosByTitle,
  getUserByEmail,
  getUsersByStatus,
  getPhotoById
};

