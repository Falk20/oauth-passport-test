const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const secret = require('./config/client_secret.json');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect(secret.mongodb.dbURI, { useNewUrlParser: true }, ()=>{
    console.log('connected to mondogb');
})


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log('app now listening for req on port 3000');
});