/** @format */

const express = require('express');
const app = express();
const { UserGame } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  registerPage: (req, res) => {
    res.render('register');
  },
  registerViews: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    UserGame.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
      .then((user) => {
        res.redirect('/login');
      })
      .catch((err) => {
        res.redirect('/register');
      });
  },
};
