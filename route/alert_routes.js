'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt');
const User = require('../model/user');


const router = module.exports = exports = express.Router();

router.post('/', bodyParser, jwtAuth, (req, res, next) => {
  req.body.userId = req.user._id;
  let newAlert = new Alert(req.body);
  newAlert.save((err, alert) => {
    if (err) return next(err);
    res.json(alert);
  });
});

router.post('/saveRoute', bodyParser, jwtAuth, (req, res, next) => {
  let savedUser = req.user;
  let savedUserName = req.user.username;
  User.findOne({username: savedUserName})
    .exec( (err, user) => {
         user.routes.push({
           nickname: req.body.nickname,
           route_id: req.body.route_id,
           stop_id: req.body.stop_id,
           hour: req.body.hour,
           minute: req.body.minute
         });
         user.save((err, user) => {
           if(err) return next(new Error(err));
           res.json(user);
         });
    });
});

//TODO ensure only user can get a list of their own routes
router.get('/', jwtAuth, (req, res, next) => {
  Alert.find({}, (err, alerts) => {
    if (err) return next(err);
    res.json(alerts);
  });
});


//TODO better error message
router.use((req, res, next) => {
  let cbString = req._parsedUrl.path.split('/').pop();
  Alert.findOne({
    cbString: cbString
  }, (err, obj) => {
    if (err) return next(err);
    if (obj === null) return next(Error('bad bad bad'));
    res.json(obj);
  });
});
