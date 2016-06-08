'use strict';

const express = require('express');
const User = require('../model/user');
const jwtAuth = require('../lib/jwt');
const bodyParser = require('body-parser').json();
// const Route = require('../model/user');

const routeRouter = module.exports = exports = express.Router();

routeRouter.get('/', (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if (err || !user) return next(new Error(err));
    res.json(user.routes);
  });
});

routeRouter.post('/', bodyParser, (req, res, next) => {
  //let savedUser = req.user;
  console.log(req.user);
  let savedUserName = req.user.username;
  User.findOne({
    username: savedUserName
  })
    .exec((err, user) => {
      user.routes.push({
        nickname: req.body.nickname,
        route_id: req.body.route_id,
        stop_id: req.body.stop_id,
        hour: req.body.hour,
        minute: req.body.minute
      });
      user.save((err, user) => {
        if (err) return next(new Error(err));
        res.json(user);
      });
    });
});

// routeRouter.delete('/:id/routes', (req, res, next) => {
//   let deleteRoute = req.body.route
//   User.findOneAndRemove({_id: req.params.id}, (err, user) => {
//     user.routes.
//     if (err || !user) return next(new Error(err));
//     let message = 'successfully deleted';
//     res.json({message});
//   });
// });
