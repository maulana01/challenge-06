/** @format */

const express = require('express');
const app = express();
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
require('./passport-config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const router = require('./router');
app.use(router);

module.exports = app;
