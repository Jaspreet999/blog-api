const User = require('../model/user')
const jwt = require('jsonwebtoken');
const passport = require('passport')


exports.login_user = function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user : user
                });
            }
    
            req.login(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
    
               // generate a signed son web token with the contents of user object and return it in the response
    
            const payload = {
                username : user.username,
                id:user._id
            }
            const token = jwt.sign(payload, 'random number',{expiresIn:"1d"});
    
            return res.status(200).json({
                status:true,
                message:"logged in successfully!!",
                token:"Bearer "+token,
                user:payload
            })
    
               
            });
    
        })(req, res);
    
}
    

exports.logout_user = function(req,res){
  res.send("first login or sign in")   
}


exports.signup_user = async function(req,res){

    const userExists = await User.find({ username: req.body.username });
    if (userExists.length > 0) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }
    
    User.create(
        { username: req.body.username, password: req.body.password },
         (err, user) => {
          if (err) return next(err);

          jwt.sign(
            { id: user._id, username: user.username },
            "random number",
            { expiresIn: "5m" },
            (err, token) => {
              if (err) return console.log(next(err));

              return res.status(200).json({
                token,
                user: {
                  id: user._id,
                  username: user.username,
                },
                message: "Signup successful",
              });
            }
          );
        }
      );
}