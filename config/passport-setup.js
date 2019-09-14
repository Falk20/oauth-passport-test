const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const secret = require('./client_secret.json');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        //options
        callbackURL: '/auth/google/redirect',
        clientID: secret.web.client_id,
        clientSecret: secret.web.client_secret
    }, (accessToken, refreshToken, profile, done)=>{
        // check if user already exists in our own db
        console.log('hello!!!');
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                // do something
            } else {
                // if not, create user in our db
                let user = new User({
                    googleId: profile.id,
                    username: profile.displayName
                });
                user.save((err, user) => {
                    if (err) {
                      console.log('err', err)
                    }
                    console.log('saved user:', user)
                }).then((newUser) => {
                    console.log('created new user: ', newUser);
                    // do something
                });
            }
        });
    })
);