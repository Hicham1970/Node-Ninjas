const express = require("express");
const path = require("path");
const { title } = require("process");

//Express app
const app = express();
// Register view engin : moteur de vues
app.set("view engine", "ejs");
// Set the path to the views folder
app.set("views", path.join(__dirname, "views"));

//listen for request
app.listen(3000);

//GET request
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views", "index"), { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render(path.join(__dirname, "views", "about"), { title: "About" });
});
// Create
app.get("/blogs/create", (req, res) => {
  res.render(path.join(__dirname, "views", "create"), { title: "Create" });
});
// test
app.get("/contact", (req, res) => {
  let d = new Date();
  let slt = d.getHours() < 17 ? "Bonjour" : "Bonsoir";

  let obj = {
    name: ["A", "B", "C", "D", "E"],
    salutation: slt,
  };

  res.render(path.join(__dirname, "views", "contact"), {
    title: "Contact",
    obj: obj,
  });
});

//404 Page :
app.use((req, res) => {
  res
    .status(404)
    .render(path.join(__dirname, "views", "404"), { title: "404" });
});
