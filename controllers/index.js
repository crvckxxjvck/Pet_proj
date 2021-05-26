const showIndexPage = (req, res) => {
  res.render("index");
};
const showAdminPage = (req, res) => {
  res.render("admin");
};

const showUploadPage = (req, res) => {
  res.render("upload");
};


module.exports = {
  showIndexPage,
  showAdminPage,
  showUploadPage,
};
