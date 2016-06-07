'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt');


const router = module.exports = exports = express.Router();

router.post('/', bodyParser, jwtAuth, (req, res, next) => {
  req.body.userId = req.user._id;
  let newAlert = new Alert(req.body);
  newAlert.save((err, alert) => {
    if (err) return next(err);
    res.json(alert);
  });
});

router.get('/', jwtAuth, (req, res, next) => {
  Alert.find({}, (err, alerts) => {
    if (err) return next(err);
    res.json(alerts);
  });
});

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
