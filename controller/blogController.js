const User = require('../model/user')
const Blog = require('../model/blog')
const Comment = require('../model/comment')
const {body,validationResult} = require('express-validator')

exports.create_blog = [
  
  body('description').trim().isLength({min:1}).withMessage("please enter some text").escape(),
  body('title').trim().isLength({min:1}).withMessage("please enter title").escape(),

    (req,res,next)=>{
        
        const error = validationResult(req)

        if(!error.isEmpty()){
            console.log(error)
            return res.json({error:error.array(),data:req.body})
            
        }

        const user = req.user;
        if(user){
          
            const blog = new Blog({
                title:req.body.title,
                message:req.body.description,
                author:user._id,
                visibility:req.body.visibility
            })
            
            blog.save( (err)=>{
                if(err) return next(err)
                
                return res.status(200).json({message:"post sent"})
            })
        }else{
            return res.json({errMess:"user is not autheticated"})
        }
    
    }
]

exports.get_one_blog =async function(req,res){
  try{

      const blog = await Blog.findById(req.params.id)
      
      if(blog){
        const comment = await Comment.find({blog:blog._id})
        
        if(comment){
          res.status(200).json({blog:blog,comment:comment})
        }else{
          res.status(200).json({blog}) 
        }
      }else{
         res.json({error:"No blog"})
      }    

  }  
  catch(e){
    res.json({error:"some server side error"})
  } 

}

exports.get_blogs = async function(req,res){
  try{ 
      console.log("iub")
      const blogs = await Blog.find({}).populate('author')
      
      if(blogs){
        res.status(200).json({blogs}) 
      }
      else{
        res.json({error:"no blog"})
      }
       
  }  
  catch(e){
    res.json({error:"some server side error"})
  } 
}

exports.update_blog = [
  
  body('description').trim().isLength({min:1}).withMessage("please enter some text").escape(),
  body('title').trim().isLength({min:1}).withMessage("please enter title").escape(),

    (req,res,next)=>{
        
        const error = validationResult(req)

        if(!error.isEmpty()){
            console.log(error)
            return res.json({error:error.array(),data:req.body})
            
        }

        const user = req.user;
        if(user){
          
            const blog = new Blog({
                _id:req.params.id,
                title:req.body.title,
                message:req.body.description,
                author:user._id,
                visibility:req.body.visibility
            })
            
            Blog.findByIdAndUpdate(req.params.id,blog,(err,result)=>{
                if(err) return next(err)
                
                return res.status(200).json({message:"post sent"})
            })
        }else{
            return res.json({errMess:"user is not autheticated"})
        }
    
    }
]