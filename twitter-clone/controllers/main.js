const axios = require("axios");

module.exports.getMainPage = (req, res) => {
  if (req.isAuthenticated()) {
    const userData = req.user.data[0];
    // console.log(req.params.page);
    axios
      .get(`${process.env.BASE_URL}/tweet/${userData.id}`)
      .then((result) => {
        const tweets = result.data;
        // console.log(tweets);
        res.render("main", { page: req.params.page, tweets, userData });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};
