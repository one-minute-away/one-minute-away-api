'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const User = require('../model/user');


//TODO create callback url:
//1 Get alarm_id from params
//2 Look up alert
//3 look up user
//4 fire twilio

router.get('firealert', (req, res, next) => {
  Alert.find({_id: req.param('alarm_id')}, (err, alert) => {
    if (err) return next(err);
    User.find({_id: alert.userId}, (err, user) => {
      if (err) return next(err);
      // fire twilio
    });
  });
});
