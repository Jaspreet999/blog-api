const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    
    username:
    {   type:String,
        required:true
    },
    password:{type:String,required:true},
    Date:{type:Date,default:new Date(),immutable:true},
})

user.virtual("id").get(function(){
    return this._id
})

module.exports = mongoose.model('User',user)