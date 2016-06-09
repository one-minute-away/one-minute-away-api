'use strict';
const express = require('express');
const Alert = require('../model/alert');
const User = require('../model/user');
const hookRouter = module.exports = exports = express.Router();
const twilio = require('../lib/twilio-client');


hookRouter.get('/firealert', (req, res, next) => {
  console.log("Q",req.query);
  //console.log("B",req.body);
  Alert.findOne({
    _id: req.query['ALERT_ID']
  }, (err, alert) => {
    console.log("alert", alert);
    if (err) return next(err);
    User.findOne({
      _id: alert.userId
    }, (err, user) => {
      if (err) return next(err);
      twilio.sendSms(user.phoneNumber, 'GO! your bus is so close!', (err, status) =>{
        console.log('sending text');
        if (err) next(err);
        if (status) res.json({message:'alert fired'});
      });
    });
  });
});
