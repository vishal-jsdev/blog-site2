const Blog = require('../models/blog.Schema');
const mongoose = require('mongoose');
const {
  validateDate
} = require('../utils/blog/blogData.helper');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/APIResponse');
const { ApiError } = require('../utils/APIError');

module.exports.addBlog = asyncHandler(async (req, res) => {
  const { title, slug , content , author, category, date } = req.body;
  if (!title || !slug || !content || !author || !category || !date) {
    throw ApiError.badRequest(
      'Title, Slug, Content, Author, Category and Date are required'
    );
  }

  const parsedDate = validateDate(date);


  const blog = new Blog({
    title,
    slug,
    content,
    author,
    category,
    date: parsedDate
  });
  const newBlog = await blog.save();

  
  return res
    .status(201)
    .json(
      ApiResponse.created(
        { id: newBlog._id, title: newBlog.title, slug: newBlog.slug, content: newBlog.content, author: newBlog.author, category: newBlog.category,date: newBlog.date },
        'Blog created successfully!'
      )
    );
});

module.exports.updateBlog = asyncHandler(async (req, res) => {
  const { id, title, slug , content , author, category, date } = req.body;
if (!id || !title || !slug || !content || !author || !category || !date) {
    throw ApiError.badRequest(
      'ID, Title, Slug, Content, Author, Category and Date are required'
    );
  }

    const parsedDate = validateDate(date);

let saveData = {
  title,
  slug,
  content,
  author,
  category,
  date: parsedDate
} 

let blogData = await Blog.findByIdAndUpdate(
      id,
      { $set: saveData },
      { new: true, runValidators: true }
    );
  
  return res
    .status(200)
    .json(
      ApiResponse.success(
        blogData,
        'Blog updated successfully!'
      )
    );
});

module.exports.getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;


let blogData = await Blog.findById(id);
  
  return res
    .status(200)
    .json(
      ApiResponse.success(
        blogData,
        'Blog data got successfully!'
      )
    );
});

module.exports.removeBlog = asyncHandler(async (req, res) => {
const { id } = req.params;


let blogData = await Blog.findByIdAndDelete(id);
  
  return res
    .status(200)
    .json(
      ApiResponse.success(
        blogData,
        'Blog data deleted successfully!'
      )
    );
});

module.exports.getBlogs = asyncHandler(async (req, res) => {
let { page, limit } = req.query;
page = parseInt(page) || 1;
limit = parseInt(limit) || 10;

const skip = (page - 1) * limit;
let blogs = await Blog.find().sort({ date: -1 }).skip(skip).limit(limit).lean();
  
  return res
    .status(200)
    .json(
      ApiResponse.success(
        blogs,
        'Blogs got successfully!'
      )
    );
});

