const Comment = require('../model/comment')
const {body,validationResult} = require('express-validator')

exports.create_comment = async function(req,res){

    try{
        const data = await req.body.comment
        
        const comment = new Comment({
            username: data.username,
            message:data.message,
            blog:data.blog
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

exports.get_comments  = function(req,res){
    res.send("get comment is not working")
}