const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../model/user.model");

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    let user = await User.findOne({email: email});
    if(!user){
        return done(null, false);
    }else{
        if(password == user.password){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    let user = await User.findById(id);
    if(user){
        done(null, user);
    }
});

module.exports = passport;