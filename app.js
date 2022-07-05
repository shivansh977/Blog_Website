//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash")
const homeStartingContent = "Welcome to the blog Website made by Shivansh, by going to compose, you may start posting.";
const aboutContent = "The project was developed to demonstarte uses of EJS and ExpressJS";
const contactContent = "You may contact us on abc@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];
app.get('/',(req,res) => {
  res.render("home",{startingContent: homeStartingContent,posts:posts});
});

app.get('/about',(req,res) => {
  res.render("about",{startingContent: aboutContent});
});

app.get('/contact',(req,res) => {
  res.render("contact",{startingContent: aboutContent});
});

app.get('/compose',(req,res) => {
  res.render("compose");
});

app.post('/compose',(req,res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:postID',(req,res)=>{
  //console.log(req.params.postID);
  var flag=0;const var1=_.lowerCase(req.params.postID);
  let tor;
  posts.forEach(function(post) {
    const var2=_.lowerCase(post.title);
    if(var1===var2){
      flag=1;
      tor=post;
    }
  });
  if(flag===1){
    res.render('post',{post:tor});
  }
  else{
    res.redirect('/');
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
