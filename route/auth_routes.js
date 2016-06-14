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
      let obj = {};
      obj.token =  user.generateToken();
      obj.userId = user._id;
      res.json(obj);
    });
  });
});

authRouter.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    //if you find yourself having to put just parens on the next line or have
    //an exceptionally long line in a conditional just break it down to another
    //line. You can still do a second line without the braces but using the
    //braces on a conditional every once in a while isn't a terrible thing.
    if (err || !user) return next(new Error('user not found or error'
    ));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Could not sign in'));
    //for setting multiple fields I would just use an object literal.
    //though you shouldn't need to send back the id. You can get it from
    //the decoded token.
    let obj = {};
    obj.token =  user.generateToken();
    obj.userId = user._id;
    res.json(obj);
  });
});
