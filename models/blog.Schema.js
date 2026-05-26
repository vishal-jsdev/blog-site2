const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    author: {
      type: String,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
    },
    date: {
        type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;