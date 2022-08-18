const passport = require('passport');
const jwtstrategy = require('passport-jwt').Strategy;
const jwtextract = require('passport-jwt').ExtractJwt;
const adminmodel = require('../model/admin');

const opts = {
    jwtFromRequest : jwtextract.fromAuthHeaderAsBearerToken(),
    secretOrKey  : 'harshjwt'
}

passport.use(new jwtstrategy(opts, (userData,done)=>{
    adminmodel.findById(userData._id,(err,user)=>{
        if(err){return done(null,err)}
        if(user){
            // console.log(userData);
            // console.log(user);
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}))

passport.serializeUser((user,done)=>{
    // console.log(user);
    return done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    adminmodel.findById(id,(err,user)=>{
        if(err){return done(null,err)}
        // console.log(user);
        return done(null,user);
    });
});

module.exports = passport;