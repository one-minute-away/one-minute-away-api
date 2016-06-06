'use strict'
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt')


const router = module.exports = exports = express.Router();

router.post('/', bodyParser, jwtAuth, (req, res, next) => {
  console.log(req);
  let newAlert = new Alert(req.body);
  newAlert.save((err, alert) => {
    if (err) return next(err);
    res.json(alert);
  });
});

router.get('/', (req, res, next) => {
  Alert.find({}, (err, alerts) => {
    if (err) return next(err);
    res.json(alerts);
  });
});

router.use((req, res, next) => {
  let cbString = req._parsedUrl.path.split('/').pop();
  console.log(cbString);
  Alert.findOne({
    cbString: cbString
  }, (err, obj) => {
    if (err || obj === null) return next(err);
    res.json(obj);
  });
});
