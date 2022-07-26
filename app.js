const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require('passport');

const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blogs')
const commentRoutes = require('./routes/comment')


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
require('./config/passport')

app.use('/blogs',blogRoutes)
app.use('/user',userRoutes)
app.use('/comment',commentRoutes)

app.listen(port,(req,res)=>{
    console.log("server is runing at : " + port)
})

module.exports  = app