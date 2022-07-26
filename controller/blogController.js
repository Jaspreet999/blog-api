const User = require('../model/user')
const Blog = require('../model/blog')
const Comment = require('../model/comment')
const jwt = require('jsonwebtoken');
const {body,validationResult} = require('express-validator')

exports.create_blog = function(req,res){
   
  jwt.verify(req.token, "random number", (error, authData) => {
    if (error){
      return res.status(400).json({error});
    } 
    req.authData = authData;
    
  });
  
  
  const user = req.authData;
  if(user){
      
      const data = req.body.blog
      const blog = new Blog({
          title:data.title,
          message:data.description,
          author:req.authData.id,
          visibility : true
      })

      if(data.visibility !== 'public'){
        blog.visibility = false
      }
      
      blog.save( (err)=>{
          if(err) return next(err)
          
          return res.status(200).json({message:"post sent"})
      })
  }else{
      return res.json({error:"user is not autheticated"})
  }

}

exports.get_one_blog_un =async function(req,res,next){
  try{
    const blog = await Blog.findById(req.params.id)

    if(blog){
      const comment = await Comment.find({blog:blog._id})
      
      if(comment){
        return res.status(200).json({blog:blog,comment:comment})
      }else{
        return res.status(200).json({blog}) 
      }
    }else{
        return res.json({error:"No blog"})
    } 
  }catch(e){
    return res.status(404).json({error:"server side error"})
  }     

}  



exports.get_one_blog =async function(req,res,next){
  try{
      
    jwt.verify(req.token, "random number", (error, authData) => {
      if (error){
        return res.status(400).json({error});
      } 
      req.authData = authData;
      
    });
      
      const blog = await Blog.findById(req.params.id)

      if(blog){
        const comment = await Comment.find({blog:blog._id})
        
        if(comment){
          return res.status(200).json({blog:blog,comment:comment})
        }else{
          return res.status(200).json({blog}) 
        }
      }else{
         return res.json({error:"No blog"})
      }    

  }  
  catch(e){
    res.json({error:"some server side error"})
  } 

}

exports.get_user_blogs = function(req,res,next){
    
      jwt.verify(req.token, "random number", (error, authData) => {
        if (error){
          return res.status(400).json({error});
        } 
        req.authData = authData;
        
      });

    if(req.authData){
    
      Blog.find({author:req.authData.id})
      .populate('author')
      .exec((err,blogs)=>{
        
          if(err){
            return res.status(400).json(err);
          }

          if(!blogs) return res.status(200).json({error:"No blog"})
          
          return res.status(200).json({blogs:blogs})
      })
    }else{
      return res.json({error:"some server side error"})
    }  
}


exports.get_blogs = async function(req,res){
  try{ 
      
      Blog.find({visibility:true}).populate('author')
      .exec((err,blogs)=>{
        if(blogs){
          res.status(200).json({blogs:blogs,user:req.user}) 
        }else{
          res.json({error:"no blog"})
        }
      })
      
    
       
  }  
  catch(e){
    res.json({error:"some server side error"})
  } 
}
exports.delete_blog = function(req,res){

  jwt.verify(req.token, "random number", (error, authData) => {
    if (error){
      return res.status(400).json({error});
    } 
    req.authData = authData;
    
  });
  if(req.authData){
    Blog.findByIdAndDelete(req.params.id)
    .exec((err)=>{
      if(err) return next(err)
      
      return res.status(200).json({message:"post sent"})
    })
  }else{
    return res.json({message:"user is not authenticated"})
  }
}

exports.update_blog = function(req,res){
   
  jwt.verify(req.token, "random number", (error, authData) => {
    if (error){
      return res.status(400).json({error});
    } 
    req.authData = authData;
    
  });
  
  
  const user = req.authData;
  if(user){
      const data = req.body.blog
      const blog = new Blog({
        _id:req.params.id,
        title:data.title,
        message:data.description,
        author:user.id,
        visibility:true
    })

      if(data.visibility !== 'public'){
        blog.visibility = false
      }
      console.log(blog)
      Blog.findByIdAndUpdate(req.params.id,blog,(err,result)=>{
        if(err) return next(err)
        
        return res.status(200).json({message:"post sent"})
      })
  }else{
      return res.json({error:"user is not autheticated"})
  }

}

exports.update_visibility = async function(req,res){

  jwt.verify(req.token, "random number", (error, authData) => {
    if (error){
      return res.status(400).json({error});
    } 
    req.authData = authData;
    
  });

  try{
    const user = req.authData;
    if(user){
      const blog = await Blog.findById(req.params.id)
      
      if(blog.visibility == true){
        blog.visibility = false
      }else{
        blog.visibility = true
      }
        
        Blog.findByIdAndUpdate(req.params.id,blog,(err,result)=>{
          if(err) return next(err)
          
          return res.status(200).json({message:"post sent"})
        })
    }else{
        return res.json({error:"user is not autheticated"})
    }
  }catch(e){
    return res.status(404).json({error:"user is not autheticated"})
  }

}
  