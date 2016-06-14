'use strict';

const express = require('express');
const User = require('../model/user');
const jwtAuth = require('../lib/jwt');
const bodyParser = require('body-parser').json();

const routeRouter = module.exports = exports = express.Router({mergeParams:true});

routeRouter.get('/', jwtAuth, (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if (err || !user) return next(new Error(err));
    res.json(user.routes);
  });
});

routeRouter.post('/', bodyParser, jwtAuth, (req, res, next) => {
  //set to let username so you can...
  let savedUserName = req.user.username;
  //...User.findOne({username})
  User.findOne({
    username: savedUserName
  })
    .exec((err, user) => {
      //I think you could just push req.body here. Since you're only
      //using it in this one place and responding afterwards you should
      //be safe from reference problems.
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

routeRouter.delete('/:id', jwtAuth, (req, res, next) => {
  let savedRouteId = req.params.id;
  User.findOne({_id: req.user._id}, (err, user) => {
    if (!user.routes.id(savedRouteId) || err) return next(new Error(err));
    user.routes.id(savedRouteId).remove();
    user.save(function(err){
      if (err) return next(err);
    });
    //same line
    if (err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});
