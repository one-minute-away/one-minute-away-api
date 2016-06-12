'use strict';
const express = require('express');
const Alert = require('../model/alert');
const User = require('../model/user');
const hookRouter = module.exports = exports = express.Router();
const sendSms = require('../lib/sendsms');


hookRouter.get('/firealert', (req, res, next) => {
  Alert.findOne({
    _id: req.query['ALERT_ID']
  }, (err, alert) => {
    if (err) return next(err);
    User.findOne({
      _id: alert.userId
    }, (err, user) => {
      if (err) return next(err);
      sendSms(user.phoneNumber, 'GO! your bus is so close!', (err, status) =>{
        if (err) next(err);
        if (status) res.json({message:'alert fired'});
      });
    });
  });
});
