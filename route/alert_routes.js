'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt');

const alertRouter = module.exports = exports = express.Router();

alertRouter.post('/', bodyParser, jwtAuth, (req, res, next) => {
  req.body.userId = req.user._id;
  let newAlert = new Alert(req.body);
  newAlert.save((err, alert) => {
    if (err) return next(err);
    res.json(alert);
  });
});

alertRouter.get('/', jwtAuth, (req, res, next) => {
  Alert.find({userId:req.user._id}, (err, alerts) => {
    if (err) return next(err);
    res.json(alerts);
  });
});
