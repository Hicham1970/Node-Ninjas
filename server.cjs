const express = require("express");
const path = require("path");
const { title } = require("process");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./Models/blog");

//Express app
const app = express();

// Connect to MongoDB et l'app. ne va écouter que qd la connexion est établie:
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
app.set("views", path.join(__dirname, "views"));

//listen for request
// app.listen(3000);

// Creation de mon propre middleware:
// app.use(function (req, res, next) {
//   console.log("Une nouvelle requête est crée !! ");
//   console.log("Host :", req.hostname);
//   console.log("Path :", req.path);
//   console.log("Method :", req.method);
//   next();
// });

// Middleware & static files comme photos ou styles.css ...
app.use(express.static(path.join(__dirname, "public")));

// Utiliser le middleware Morgan:
// app.use(morgan("dev"));
app.use(morgan("tiny"));

// Mongoose a2nd mongo sandbox routes:
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Last blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });
  blog
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
});

// To get all the blogs:
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get a single blog: findById
app.get("/single-blog", (req, res) => {
  Blog.findById("66c89f94f66dca2d8383aacc")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.get("/", (req, res) => {
  const Blogs = [
    {
      title: "Blog 1",
      snippet: "Lorem ipsum dolor sit abet consectetur adipisicing élit.",
    },
    {
      title: "Blog 2",
      snippet: "Lorem ipsum dolor sit abet consectetur adipisicing élit.",
    },
    {
      title: "Blog 3",
      snippet: "Lorem ipsum dolor sit abet consectetur adipisicing élit.",
    },
  ];

  res.render(path.join(__dirname, "views", "index"), { title: "Home", Blogs });
});

app.get("/about", (req, res) => {
  res.render(path.join(__dirname, "views", "about"), { title: "About" });
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

  res.render(path.join(__dirname, "views", "contact"), {
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
  res
    .status(404)
    .render(path.join(__dirname, "views", "404"), { title: "404" });
});
