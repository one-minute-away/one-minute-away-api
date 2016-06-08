'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../model/user');
const basicHTTP = require('../lib/basic_auth');

const authRouter = module.exports = exports = express.Router();


authRouter.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashPassword();
  newUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (user) return next(new Error('User already exists' ));
    if (err) return next(new Error(err));
    newUser.save((err, user) => {
      if (err) return next(new Error(err));
      res.json({token: user.generateToken()});
    });
  });
});

authRouter.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error(err));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Could not sign in'));
    res.json({token: user.generateToken()});
  });
});
