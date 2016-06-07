'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../model/user');
const basicHTTP = require('../lib/basic_auth');
// const superuser = require('../lib/super_auth.js');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next) => {
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

router.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error(err));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Could not sign in'));
    res.json({token: user.generateToken()});
  });
});

router.get('/:id/routes', (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if (err || !user) return next(new Error(err));
    res.json(user.routes);
  });
});


//TODO route for user to save routes


// router.get('/', jwt, superuser, (req, res, next) => {
//   User.find({}, (err, user) => {
//     If (err) return next(err);
//     res.json(user);
//   });
// });
