'use strict';
const express = require('express');
const Alert = require('../model/alert');
const User = require('../model/user');
const hookRouter = module.exports = exports = express.Router();
const twilio = require('../lib/twilio-client')


hookRouter.get('/firealert', (req, res, next) => {
  Alert.findOne({
    _id: req.query['ALARM_ID']
  }, (err, alert) => {
    //console.log("alert", alert.userId);
    if (err) return next(err);
    User.findOne({
      _id: alert.userId
    }, (err, user) => {
      if (err) return next(err);
      console.log(user.phoneNumber);
      twilio.sendSms(user.phoneNumber, "hello")
    });
  });
  next();
});
