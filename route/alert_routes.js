'use strict';
const express = require('express');
const bodyParser = require('body-parser').json();
const Alert = require('../model/alert');
const jwtAuth = require('../lib/jwt');
const getRoute = require('../lib/get-route');
const getArrivals = require('../lib/get-arrivals');
const http = require('http');

const alertRouter = module.exports = exports = express.Router({mergeParams:true});

alertRouter.post('/', bodyParser, jwtAuth, getRoute, getArrivals, (req, res, next) => {
  let timeOffset = req.body.leadTime * 60;
  let alertStuff = {
    userId: req.params.id,
    alertTimeOffset: timeOffset,
    routeId: req.route_id,
    stopId: req.stop_id,
    tripId: req.tripId,
    stopSequence: req.stopSequence,
    serviceDate: req.serviceDate
  };
  let newAlert = new Alert(alertStuff);
  newAlert.save((err, alert) => {
    if (err) return next(err);
    alertStuff.id = alert._id;
    let url = 'http://api.pugetsound.onebusaway.org/api/where/register-alarm-for-arrival-and-departure-at-stop/' +
      alertStuff.stopId + '.json?' +
      'key=' + process.env.OBA_KEY +
      '&tripId=' + alertStuff.tripId +
      '&serviceDate=' + alertStuff.serviceDate +
      //'&vehicleId=' + alertObj.vehicleId +
      '&stopSequence=' + alertStuff.stopSequence +
      '&alarmTimeOffset=' + timeOffset +
      '&url=' + process.env.CALLBACK_URL + '/?ALERT_ID=' + alertStuff.id + '&onArrival=true';
    http.get(url, (response, err) => {
      var body = '';
      response.on('data', function (chunk) {
        body += chunk;
      });
      response.on('end', function () {
        if(err) return next(new Error(err));
        res.json({status:JSON.parse(body).code});
      });
    });
  });
});

alertRouter.get('/', jwtAuth, (req, res, next) => {
  Alert.find({userId:req.user._id}, (err, alerts) => {
    if (err) return next(err);
    res.json(alerts);
  });
});
