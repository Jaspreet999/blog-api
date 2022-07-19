const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');


const indexRoutes = require('./routes/index')
const indexRoutes1 = require('./routes/index2')
const user = require('./model/user')
const Blog = require('./model/blog')
const Comment = require('./model/comment')
const passport = require('passport');

const port = process.env.port || 3001 

// database connectivity
const url = "mongodb+srv://m-001-student:m001-mongodb@sandbox.zoqk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
var db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection Error"))

const app = express()

app.set("views engine", 'pug')

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(passport.initialize())
require('./passport')

app.post('/login',(req,res)=>{
    user.findOne({username:req.body.username})
    .exec((err,user)=>{
        
        if(!user){
            return res.status(401).json({
                status:false,
                message:"user not found"
            })
        }
        
        if(user.password !== req.body.password){
            return res.status(401).json({
                status:false,
                message:"password not match"
            })
        }

        const payload = {
            username : user.username,
            id:user._id
        }
        const token = jwt.sign(payload, 'random number',{expiresIn:"1d"});

        return res.status(200).json({
            status:true,
            message:"logged in successfully!!",
            token:"Bearer "+token
        })

    })
})

// app.get('/blogs/:id',async (req,res)=>{
//     try{

//         const blog = await Blog.findById(req.params.id)
//         console.log(blog)
//         if(blog){
//           const comment = await Comment.find({blog:blog._id})
          
//           if(comment){
//             res.status(200).json({blog:blog,comment:comment})
//           }else{
//             res.status(200).json({blog}) 
//           }
    
  
//       }else{
//         res.json({error:"user is not authenticated"})
//       }    
  
//     }  
//     catch(e){
//       res.json({error:"some server side error"})
//     } 
  
// })

// app.get('/blogs', async (req,res)=>{
//     try{ 
        
//         const blogs = await Blog.find({}).populate('author')
        
//         if(blogs){
//           res.status(200).json({blogs}) 
//         }
//         else{
//           res.json({error:"no blog"})
//         }
         
//     }  
//     catch(e){
//       res.json({error:"some server side error"})
//     } 
//   })

app.use('/blogs',indexRoutes1)
app.use('/',passport.authenticate('jwt',{session:false}),indexRoutes)


app.listen(port,(req,res)=>{
    console.log("server is runing at : " + port)
})

module.exports  = app