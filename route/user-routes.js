'use strict';

const express = require('express');
//const bodyParser = require('body-parser').json();
const User = require('../model/user');
//const basicHTTP = require('../lib/basic_auth');
// const superuser = require('../lib/super_auth.js');

const router = module.exports = exports = express.Router();


//TODO GET /user/:id send user info


//TODO DELETE /user/:id delete user


//TODO move to routes and create correct route name
router.get('/:id/routes', (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if (err || !user) return next(new Error(err));
    res.json(user.routes);
  });
});


// TODO move to admin route
// router.get('/', jwt, superuser, (req, res, next) => {
//   User.find({}, (err, user) => {
//     If (err) return next(err);
//     res.json(user);
//   });
// });
