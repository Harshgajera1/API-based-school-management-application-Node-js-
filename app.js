const express = require('express');
const passport = require('passport');
const session = require('express-session');
const jwtAuth = require('./config/jwt-statergy');
const db =require('./config/mongo');

const app = express();

app.use(express.urlencoded());

app.use(session({
    name : 'jwttoken',
    secret : 'harsh',
    saveUninitialized : false,
    resave : false,
    cookie  : {maxAge : 1000*60}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./router/index'));


app.listen(8000,()=>{
    console.log('server start port no 8000');
});