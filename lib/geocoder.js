'use strict';

const https = require('https');

var returnLatLon = function (req, res, next) {
  let input = req.params.address;
  let transInput = input.replace(/ /g, '+');
  let latLon = {};
  //multiple lines/querystring
  https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + transInput + '&components=administrative_area:WA|country:US&key=AIzaSyBfZaQHik2dijoIwINtPKT-4q-qQMGnLHw', (response, err) => {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      var jsonResponse = JSON.parse(body);
      latLon.lat = jsonResponse.results[0].geometry.location.lat;
      latLon.lng = jsonResponse.results[0].geometry.location.lng;
      if (!latLon.lat || !latLon.lng) return next(new Error('could not find address. please refine'));
      //Good, ideally middleware modifications should be relatively small.
      //So one property is a good way to go.
      req.latLon = latLon;
      next();
    }).on('error', function () {
      return next(new Error(err, 'error finding address'));
    });
  });
};

module.exports = returnLatLon;
