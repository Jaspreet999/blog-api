const User = require('../model/user')
const {body,validationResult} = require('express-validator')

// exports.login_user = function(req,res){
//     res.send("login service is not available")
// }

exports.logout_user = function(req,res){
  res.send("first login or sign in")   
}

exports.signup_user = [

  body('username','username must be required').trim().isLength({min:1}).escape(),
  body('password').trim().isLength({min:4,max:16}).withMessage('password should be min 4 digits'),
  body('confirmPassword').trim().isLength({min:4,max:16}).withMessage('password should be min 4 digits'),
  
  
  (req,res,next)=>{

      var errmessage = "";
      const error = validationResult(req)

      if(req.body.password !== req.body.confirmPassword){
          errmessage = "password not match"
      }

      if(!error.isEmpty()){
          res.render('signup' ,{error:error.array(),errMess:errmessage})
          return;
      }else{
          //const hashPassword = bcrypt.hash(req.body.password,10)
          //register user
          const user = new User({
              username:req.body.username,
              password:req.body.password
          })
          user.save(function (err){
              if(err) return next(err)

              res.status(200).json({msg:"user created"})
          })

      }
      
  } 
]

