'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt');
const User = require('../model/user');

const router = module.exports = exports = express.Router();


// TODO what is this and can it be deleted?
router.post('/', bodyParser, jwtAuth, (req, res, next) => {
  req.body.userId = req.user._id;
  let newAlert = new Alert(req.body);
  newAlert.save((err, alert) => {
    if (err) return next(err);
    res.json(alert);
  });
});

// TODO route should be /user/:id/alert


//TODO finish /user/:id/alert (ensure only user can get a list of their own routes)
router.get('/user/:id/alert', jwtAuth, (req, res, next) => {
  Alert.find({}, (err, alerts) => {
    if (err) return next(err);
    res.json(alerts);
  });
});
