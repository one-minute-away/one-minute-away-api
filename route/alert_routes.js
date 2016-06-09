'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt');
const getRoute = require('../lib/get-route');
const getArrivals = require('../lib/get-arrivals');

const alertRouter = module.exports = exports = express.Router({mergeParams:true});

alertRouter.post('/', bodyParser, jwtAuth, getRoute, getArrivals, (req, res, next) => {
  let timeOffset = req.body.leadTime * 60;
  let alertStuff = {
    userId: req.params.id,
    alertTimeOffset: timeOffset,
    routeId: req.route_id,
    tripId: req.tripId,
    stopSequence: req.stopSequence,
    serviceDate: req.serviceDate
  };
  console.log(alertStuff);
  let newAlert = new Alert(alertStuff);
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
