const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./Models/blog");
const dotenv = require("dotenv");

dotenv.config();

//Express app
const app = express();

const DbURI = process.env.DbURI;

mongoose
  .connect(DbURI)
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
// Middleware & static files comme photos ou styles.css ...
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

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

// Post Request:
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// create:
app.get("/blogs/create", (req, res) => {
  res.render("create", {
    title: "Create a New Blog",
  });
});

// Find By Id:
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete request:
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//404 Page :
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
