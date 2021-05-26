const path = require('path');
// общие параметры приложения. Обычно тут храниться все что не нашло себе место в других местах

module.exports = {
  name: 'ProGallery',
  rootDir: path.resolve(__dirname, '../'),
  tmpDir: path.resolve(__dirname, '../', 'tmp'),
  photosFolder: 'photos',
  session: 'ds23$%sdww3f',
  saltHash: '14&?f#',
};
