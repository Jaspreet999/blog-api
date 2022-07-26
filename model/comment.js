const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comment = new Schema({
    
    username:
    {   type:String,
        required:true
    },
    message:{
        type:String,
        required:true},
    blog:{
        type:Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    Date:{
        type:Date,
        default:new Date(),
        immutable:true},
})

comment.virtual('id').get(function(){
    return this._id
})

module.exports = mongoose.model('Comment',comment)