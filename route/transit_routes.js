//schedule routes
'use strict';

const express = require('express');
const geocoder = require('./../lib/geocoder');
const getStops = require('./../lib/get-stops');
//const jwtAuth = require('../lib/jwt');

const transitRouter = module.exports = exports = express.Router();

transitRouter.get('/findstops/:address', geocoder, getStops, (req, res, next) => {
  res.json(req.stopsList);
  next();
});
