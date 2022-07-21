require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
let counter = 1;
function isNum(val) {
  return !isNaN(val);
}

function getSqlData(rows){
  return Object.values(JSON.parse(JSON.stringify(rows)));
}

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect(function (err) {
  if (err) console.log(err);
  else console.log("Connected to database!");
});

const tableName = `${process.env.DB_NAME}.jokes`;
const createTableQuery = `create table if not exists ${tableName} (id int primary key, joke varchar(500) not null);`;
con.query(createTableQuery, (err) => {
  if (err) console.log(err);
  else{
    con.query(`select count(*) as count from ${tableName}`,(error,rows)=>{
      if(error) console.log(error);
      counter += getSqlData(rows)[0].count;
    })
  }
});


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/joke", (req, res) => {
  axios
    .get(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist&type=single"
    )
    .then((response) => {
      const { joke } = response.data;
      const jokeData = { joke, jokeId: counter };
      const insertQuery = `insert into ${tableName} values(${counter}, \'${joke.replaceAll(
        "'",
        "''"
      )}\');`;
      con.query(insertQuery, (err) => {
        if (err) console.log(err);
      });
      counter++;
      res.json(jokeData);
    })
    .catch((err) => console.log(err));
});

app.get("/joke/:id", (req, res) => {
  const jokeId = req.params.id;
  // console.log(jokeId);
  const getJokeByIdQuery = `select * from ${tableName} where id=${jokeId}`;
  con.query(getJokeByIdQuery, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      const jokeData = getSqlData(rows);
      if (jokeData.length === 0) {
        res.render("joke", {
          id: 404,
          joke: "Normal Person: No Joke Found.  Coder: 404 Joke!",
        });
      } else res.render("joke", jokeData[0]);
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server started at ${process.env.PORT}`)
);
