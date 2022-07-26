const mongoose = require('mongoose')
const user = require('./user')
const Schema = mongoose.Schema

const blog = new Schema({
    
    message:
    {   type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    visibility:{
        type:Boolean,
        required:true
    },
    Date:{
        type:Date,
        default:new Date(),
        immutable:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

blog.virtual('id').get(function(){
    return this._id
})

module.exports = mongoose.model('Blog',blog)