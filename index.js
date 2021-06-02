const express=require('express');
const path=require('path')
const PORT=5005;
//db connection stablishing
const db=require('./config/mongoose.js'); //start db server
const blogs=require('./models/blogs.js'); //acquire the DB model
//initializing the express server
const app=express(); //fireup the server
//setting up the template engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
//parsing the form data [Middleware]
app.use(express.urlencoded());
//home route
app.get("/",function(req,res){

    blogs.find({},function(err,docs){
        if(err){
            console.log("Error in finding the documents");
            return;
        }
        return res.render("home",{
            title:"Blogging Website",
            blogs:docs
        });
    });
});

//createBlog Route
app.post("/createBlog",function(req,res){
    blogs.create({
        name:req.body.name,
        title:req.body.title,
        date:req.body.date,
        content:req.body.blog
    }, function(err,doc){
        if(err){
            console.log("Error in creating the doc.");
            return;
        }
        console.log("new blog added  : ", doc);
        return res.redirect("back");
    });
});

//delete route
app.get("/deleteBlog",function(req,res){
    let id=req.query.blogId;
    blogs.findOneAndDelete({id},function(err,doc){
        if(err){
            console.log("Error in deleting the doc");
            return;
        }
        console.log("following blog deleted : ",doc);
        return res.redirect("back");
    });
});

app.listen(PORT,function(err){
    if(err){
        console.log("Error in lauching the server ");
        return;
    }
    console.log(`Server is up and running on port ${PORT}`);
});