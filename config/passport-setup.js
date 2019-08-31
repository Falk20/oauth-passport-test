const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const fs = require('fs');

const web = JSON.parse(fs.readFileSync('client_id.json')).web;

passport.use(
    new GoogleStrategy({
        //options
        clientID: web.client_id,
        clientSecret: web.client_secret
    }), ()=>{
        //pass callback

    }
);