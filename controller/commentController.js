const Comment = require('../model/comment')
const jwt = require('jsonwebtoken')
const {body,validationResult} = require('express-validator')

exports.create_comment = async function(req,res){

    try{
        const data = await req.body.comment
        
        const comment = new Comment({
            username: data.username,
            message:data.message,
            blog:req.params.id
        })
        
        console.log(comment)
        comment.save( (err)=>{
            if(err) return res.json({error:err});
    
            return res.status(200).json({message:"comment posted"})
        })

    }catch(e){
        return res.json({error:e})
    }

   
}

exports.create_user_comment = async function(req,res){


    jwt.verify(req.token, "random number", (error, authData) => {
        if (error){
          return res.status(400).json({error});
        } 
        req.authData = authData;
        
      });

    try{
        const data = await req.body.comment
        
        const comment = new Comment({
            username: req.authData.username,
            message:data.message,
            blog:req.params.id
        })
        
        
        comment.save( (err)=>{
            if(err) return res.json({error:err});
    
            return res.status(200).json({message:"comment posted"})
        })

    }catch(e){
        return res.json({error:e})
    }

   
}

exports.get_comments  = function(req,res){
    res.send("get comment is not working")
}