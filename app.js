const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const backRoutes = require("./router/back");
const blogRoutes = require("./router/blog");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const sequelize = require("./util/database");
const Blogs = require("./models/blogs");
const Users = require("./models/user");

app.use((req,res,next)=>{
  Users.findByPk(1)
  .then(user=>{
    req.user = user;
    next();
  })
  .catch(err=>console.log(err))
})

app.use(backRoutes);
app.use(blogRoutes);

Blogs.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(Blogs);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return Users.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return Users.create({ name: "Elgun", email: "test@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.error(err);
  });
