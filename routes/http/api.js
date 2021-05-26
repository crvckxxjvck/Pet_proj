const express = require('express');
const router = express.Router();
const controllers = require('controllers/api');

// API 

router.get('/', (req, res) => {
  let allApiJson = []
  router.stack.forEach((el) => {
    if (el.route.path !== "/") allApiJson.push(el.route.path)
  })
  res.json(allApiJson)
})

router.get('/checkdb', controllers.showMismatchedData);

router.get('/fixdb',
  controllers.deletePhotoFilesFromLocalStorage,
  controllers.deletePhotoDocumentsFromDb,
  controllers.showPhotosDeleteResult
);

router.get('/userLogin', controllers.getUserByLogin);

router.get('/photosDate', controllers.showPhotosByDate);

router.get('/users', controllers.getAllUsers);

router.get('/userId', controllers.getUserByID);

router.get('/photos', controllers.getAllPhotos);

router.get('/photosTag', controllers.getPhotosByTagSimilar);

router.get('/photosTitle', controllers.getPhotosByTitle);

router.get('/userEmail', controllers.getUserByEmail);

router.get('/usersStatus', controllers.getUsersByStatus);

router.get('/photoId', controllers.getPhotoById)

module.exports = router;