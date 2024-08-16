const express = require("express");
const path = require("path");

//Express app
const app = express();

//listen for request
app.listen(3000);

//GET request
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 Page :
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
