const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/user')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(
    new LocalStrategy((username,password,done)=>{
        User.findOne({username:username})
        .exec( (err,user)=>{
           if(err) return done(err)
           
           if(user.password!== password){
               return done(null,false,{message : "password not match"})
           }
           if(!user){
            return done(null,false,{message : "user not find"})
           }
           return done(null,user)
           
        })
    })
)

passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
      },
      (jwtPayload, done) => {
        return done(null, jwtPayload);
      }
    )
  );
  
  module.exports = passport;




