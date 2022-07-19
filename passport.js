const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./model/user')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


// passport.use(
//     new LocalStrategy((username,password,done)=>{
//         User.findOne({username:username})
//         .exec( (err,user)=>{
//            if(err) return done(err)
//            console.log(user)
//            if(user.password!== password){
//                return done(null,false,{message : "password not match"})
//            }
//            if(!user){
//             return done(null,false,{message : "user not find"})
//            }
           
//            return done(null,user)
           
//         })
//     })
// )

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'random number'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

