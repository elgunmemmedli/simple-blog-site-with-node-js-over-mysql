//models import
const Blogs = require("../models/blogs");

const moment = require('moment');


// blog-> Get
exports.getBlogAdd = (req, res, next) => {
  res.render("blog-add", {
    pageTitle: "Blog Add",
  });
};

exports.getManageBlog = (req, res, next) => {
  let activeBlogCount = 0;
  req.user.getBlogs({where : {status : 'active'}})
  .then((result)=>{
    activeBlogCount = result.length;
  })
  .catch(err=>console.log(err))
  req.user.getBlogs()
  .then((blogs=>{
    res.render("manage-blog", {
      pageTitle: "Manage Blogs",
      blogs,
      activeBlogCount,
      inactiveBlogCount : blogs.length - activeBlogCount,
    });
  }))
  .catch(err=>console.log(err))
};

exports.getBlog = (req,res,next)=>{
  const id = req.params.id;
  Blogs.findAll({where : {id : id}})
  .then(blog=>{
    const formattedDate = moment(blog[0].createdAt).fromNow();
    res.render('blog-view', {
      pageTitle : blog[0].title,
      blog : blog[0],
      author : req.user,
      formattedDate
    })
  })
  .catch(err=>console.log(err))
}

exports.getBlogEdit = (req,res,next)=>{
  const id = req.params.id;
  req.user.getBlogs({where : {id : id}})
  // Blogs.findAll({where : {id : id}})
  .then(blog=>{
    res.render('blog-edit', {
      pageTitle : blog[0].title,
      blog : blog[0]
    })
  })
  .catch(err=>console.log(err))
}

// blog-> POST
exports.postBlogAdd = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const content = req.body.content;
  const status = req.body.status ? 'active' : 'inactive';
  Blogs.create({ 
    title,
     imageUrl, 
     content, 
     status ,
     userId : req.user.id
    })
    .then((result) => {
      res.redirect('/manage-blog');
    })
    .catch((err) => console.log(err));
};


exports.postBlogEdit = (req,res,next) =>{
  const blogId = req.body.id;
  const updateTitle = req.body.title;
  const updateImageUrl = req.body.imageUrl;
  const updateContent = req.body.content;
  const updateStatus = req.body.status ? 'active' : 'inactive'
  Blogs.findByPk(blogId)
  .then(blog=>{
    blog.title = updateTitle;
    blog.imageUrl = updateImageUrl;
    blog.content = updateContent;
    blog.status = updateStatus;
    return blog.save();
  })
  .then(result=>{
    console.log('update');
  })
  .catch(err=>console.log(err, 'errr'));
  res.redirect('/manage-blog');
}

exports.postDeleteBlog = (req,res,next)=>{
  const blogId = req.body.id;
  Blogs.findByPk(blogId)
  .then(blog=>{
    return blog.destroy();
  })
  .then(result=>{
    res.redirect('/manage-blog');
  })
  .catch(err=>console.log(err))
}