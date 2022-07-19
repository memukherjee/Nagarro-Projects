require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const { MongoClient } = require("mongodb");

const app = express();
const url = "mongodb://localhost:27017";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(url);
const db = client.db("nagarroDBConn");
const collection = db.collection("items");

async function dbConnect() {
  await client.connect();
  return "Connected to Database";
}

dbConnect()
  .then(console.log)
  .catch(console.error)

app.get("/",async (req, res) => {
  const dbRes = await collection.find({}).toArray();
  res.render("index",{items: dbRes});
});

app.post("/",async (req, res) => {
  const { itemName } = req.body;
  await collection.insertOne({data:itemName});
  res.redirect("/")
});

app.listen(process.env.PORT, () =>
  console.log("Running server on port " + process.env.PORT)
);
