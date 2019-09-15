const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const secret = require('./client_secret.json');
const User = require('../models/user-model');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options
        callbackURL: '/auth/google/redirect',
        clientID: secret.web.client_id,
        clientSecret: secret.web.client_secret
    }, (accessToken, refreshToken, profile, done)=>{
        // check if user already exists in our own db
        console.log();
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                // do something
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleID: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    // do something
                    done(null, newUser);
                });
            }
        });
    })
);