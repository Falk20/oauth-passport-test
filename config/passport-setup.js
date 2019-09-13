const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
        //options
        callbackURL: '/auth/google/redirect',
        clientID: '552875495410-22gde1jlqoo5t3hdf7lofjs9jqapv5bf.apps.googleusercontent.com',
        clientSecret: 'LP_okEO6uW8vZjAwXZzn6D__'
    }, ()=>{
        //pass callback

    })
);