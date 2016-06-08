'use strict';

const express = require('express');
// const bodyParser = require('body-parser').json();
const User = require('../model/user');
const jwtAuth = require('../lib/jwt');
// const superuser = require('../lib/super_auth.js');

const userRouter = module.exports = exports = express.Router();

userRouter.get('/:id/', jwtAuth, (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    user.password = null;
    if (err || !user) return next(err);
    res.json(user);
  });
});

userRouter.delete('/:id', jwtAuth, (req, res, next) => {
  let _id = req.params.id;
  User.findOneAndRemove({_id}, (err, user) => {
    if(err || !user) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});


//TODO move to routes and create correct route name
// router.get('/:id/routes', (req, res, next) => {
//   User.findOne({_id: req.params.id}, (err, user) => {
//     if (err || !user) return next(new Error(err));
//     res.json(user.routes);
//   });
// });


// TODO move to admin route
// router.get('/', jwt, superuser, (req, res, next) => {
//   User.find({}, (err, user) => {
//     If (err) return next(err);
//     res.json(user);
//   });
// });
