const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const Blog = require("./Models/blog");
const dotenv = require("dotenv");
const blogRoutes = require("./routes/blogRoutes.js");

dotenv.config();

//Express app2
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
2;
//--------------Blogs routes--------------
app.use("/blogs", blogRoutes);
//404 Page :
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
