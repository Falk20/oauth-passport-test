const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const secret = require('./client_secret.json');

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
        done(profile);
    })
);