const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        required: true
    }
  },
  {
    timestamps: true,
  }
);
blogSchema.index({date:1})
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;