const Blog = require('../models/blog.Schema');
const mongoose = require('mongoose');
const {
  validateDate,
  validateId
} = require('../utils/blog/blogData.helper');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/APIResponse');
const { ApiError } = require('../utils/APIError');

module.exports.addBlog = asyncHandler(async (req, res) => {
  const { title, slug , content , author, category, date } = req.body;
  if (!title || !slug || !content || !author || !category || !date) {
    throw ApiError.badRequest(
      'Title, Slug, Content, Author, Category and Date are required',
      {
        title: !title ? 'Title is required' : undefined,
        slug: !slug ? 'Slug is required' : undefined,
        content: !content ? 'Content is required' : undefined,
        author: !author ? 'Author is required' : undefined,
        category: !category ? 'Category is required' : undefined,
        date: !date ? 'Date is required' : undefined,
      }
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
        newBlog,
        'Blog created successfully!'
      )
    );
});

module.exports.updateBlog = asyncHandler(async (req, res) => {
  const { id, date, ...reqData } = req.body;
  
  validateId(id, 'Blog')

  const parsedDate = validateDate(date);

  const saveData = {
    ...reqData,
    date: parsedDate
  } 

  const blogData = await Blog.findByIdAndUpdate(
      id,
      { $set: saveData },
      { new: true, runValidators: true }
    );
  if (!blogData) {
    throw ApiError.notFound('Blog is not found');
  }
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
validateId(id, 'Blog');

const blogData = await Blog.findById(id);
if (!blogData) {
  throw ApiError.notFound('Blog is not found');
}

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
validateId(id, 'Blog');

const blogData = await Blog.findByIdAndDelete(id);
if (!blogData) {
    throw ApiError.notFound('Blog data not found');
}  
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
const blogs = await Blog.find().sort({ date: -1 }).skip(skip).limit(limit).lean();
  
  return res
    .status(200)
    .json(
      ApiResponse.success(
        blogs,
        'Blogs fetched successfully'
      )
    );
});

