'use strict';
const express = require('express');
// const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const User = require('../model/user');
const hooksRouter = module.exports = exports = express.Router();

//TODO finish oba callback url:
//1 Get alarm_id from params
//2 Look up alert
//3 look up user
//4 fire twilio

//TODO put firealert function here
hooksRouter.get('firealert', (req, res, next) => {
  Alert.find({_id: req.param('alarm_id')}, (err, alert) => {
    if (err) return next(err);
    User.find({_id: alert.userId}, (err, user) => {
      if (err) return next(err);
      // fire twilio
      console.log(user);
    });
  });
});
