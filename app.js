const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const secret = require('./config/client_secret.json');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [secret.session.cookieKey]
}));

//initialize pass
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(secret.mongodb.dbURI, { useNewUrlParser: true }, ()=>{
    console.log('connected to mondogb');
})


app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for req on port 3000');
});