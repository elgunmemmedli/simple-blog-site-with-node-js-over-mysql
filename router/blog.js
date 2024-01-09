const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog');

//get
router.get('/blog-add', blogController.getBlogAdd);
router.get('/manage-blog', blogController.getManageBlog);
router.get('/blog-view/:id', blogController.getBlog);
router.get('/blog-edit/:id', blogController.getBlogEdit);

//post
router.post('/blog-add', blogController.postBlogAdd);
router.post('/blog-edit', blogController.postBlogEdit);
router.post('/delete-blog', blogController.postDeleteBlog);

module.exports = router;