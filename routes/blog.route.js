const express = require('express');
const route = express.Router();
const ctl = require('../controller/blog.ctl');


route.post('/add', ctl.addBlog);
route.put('/update', ctl.updateBlog);
route.get('/:id', ctl.getBlog);
route.delete('/:id', ctl.removeBlog);
route.get('/', ctl.getBlogs);
module.exports = route;