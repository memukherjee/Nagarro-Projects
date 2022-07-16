require("dotenv").config();
const axios = require("axios");
const express = require("express");
const _ = require("lodash");

const app = express();
const port = process.env.PORT;
const apiEndpoint = `https://en.wikipedia.org/w/api.php?`;

const apiParams = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "extracts",
  exchars: 1000,
  exintro: true,
  explaintext: true,
  generator: "search",
  gsrlimit: 1,
};

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/:id", (req, res) => {
  let keyword = _.lowerCase(req.params.id);
  apiParams.gsrsearch = keyword;
  axios
    .get(apiEndpoint, { params: apiParams })
    .then((response) => response.data)
    .then((data) => {
        const path = _.startCase(data.query.pages[Object.keys(data.query.pages)[0]].title).replaceAll(" ", "%20");
      const link = `https://en.wikipedia.org/wiki/${path}`;

      res.render("page", {
        data: data.query.pages[Object.keys(data.query.pages)[0]],
        link,
      });
    })
    .catch((err) => {
        console.log(err);
        res.render('page',{data:{title:"No results found",extract:"Try finding something else!!!"},link:"/"})
    });
});

app.listen(port, () => console.log(`Running on port ${port}`));
