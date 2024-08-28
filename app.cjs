const express = require("express");
const path = require("path");
const { title } = require("process");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./Models/blog");

//Express app
const app = express();

// Connect to MongoDB database et l'app. ne va écouter que qd la connexion est établie:
const DbURI =
  "mongodb+srv://surveyor:sgs123456@cluster0.1ujuvbr.mongodb.net/SurveyorBlogs?retrywrites=true&w=majority";

mongoose
  .connect(DbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    })
  )
  .catch((err) => {
    console.log("Erreur de connexion à MongoDB:");
    console.log(err);
  });

// Register view engin : moteur de vues
app.set("view engine", "ejs");
// Set the path to the views folder
// app.set("views", path.join(__dirname, "views"));

// Middleware & static files comme photos ou styles.css ...
app.use(express.static(path.join(__dirname, "public")));

// Utiliser le middleware Morgan:
// app.use(morgan("dev"));
app.use(morgan("tiny"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//--------------Blogs routes--------------
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "All Blogs",
        blogs: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create
app.get("/blogs/create", (req, res) => {
  res.render(path.join(__dirname, "views", "create"), {
    title: "Create a New Blog",
  });
});

// test
app.get("/contact", (req, res) => {
  let d = new Date();
  let slt = d.getHours() < 17 ? "Bonjour" : "Bonsoir";

  let obj = {
    name: ["A", "B", "C", "D", "E"],
    salutation: slt,
  };

  res.render("contact", {
    title: "Contact",
    obj: obj,
  });
});
// 2 ème middleware
app.use((req, res, next) => {
  console.log("Je suis le middleware 2 !! ");
  next();
});

//404 Page :
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
