const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// blogSchema va définir la structure du model
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creation de Model Blog:
// le mot Blog est le nom de notre Blogs collection
const Blog = mongoose.model("Blog", blogSchema);

// exporter le module:
module.exports = Blog;

// avec ce model on peut enregistrer des blogs dans notre collection blogs
