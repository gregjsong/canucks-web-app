// requires
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

// handle get
app.get("/", function (req, res) {
  let doc = fs.readFileSync("./app/html/index.html", "utf8");
  res.send(doc);
})

app.get("/leaderboards", function (req, res) {
  let doc = fs.readFileSync("./app/data/leaderboards.js", "utf8");
  res.setHeader("Content-Type", "application/json");
  res.send(doc);
})

app.get("/standings", function (req, res) {
  let doc = fs.readFileSync("./app/data/standings.html", "utf8");
  res.setHeader("Content-Type", "text/html");
  res.send(doc);
})

let port = 8000;
app.listen(port, function () {
})