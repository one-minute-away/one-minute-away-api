//schedule routes
'use strict';

const express = require('express');
const geocoder = require('./../lib/geocoder');
const getStops = require('./../lib/get-stops');

const Router = module.exports = exports = express.Router();

Router.get('/findStops/:address', geocoder, getStops, (req, res, next) => {
  res.json(req.stopsList);
});
