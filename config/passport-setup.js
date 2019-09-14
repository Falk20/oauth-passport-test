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
        //pass callback
        console.log('pass callback fired');
        console.log(profile);
        new User({
            userName: profile.displayName,
            googleID: profile.id
        }).save().then((newUser)=>{
            console.log('new user created:', newUser);
        });
    })
);