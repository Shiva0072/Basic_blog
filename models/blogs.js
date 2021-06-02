const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    title : {
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String,
        required:true
    }
});

//creating the model [a collection of collection[ : a collection of docs]]
const blogsSchema=mongoose.model('BlogsSchema',blogSchema);

module.exports=blogsSchema;