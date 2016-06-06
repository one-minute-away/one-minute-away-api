'use strict';

const https = require('https');

var returnLatLon = function(req, res, next) {
  let input = req.body.address;
  let transInput = input.replace(/ /g, '+');
  let latLon = {};
  https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + transInput + '&components=administrative_area:WA|country:US&key=AIzaSyBfZaQHik2dijoIwINtPKT-4q-qQMGnLHw', (response, err) => {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function() {
      var jsonResponse = JSON.parse(body);
      latLon.lat = jsonResponse.results[0].geometry.location.lat;
      latLon.lng = jsonResponse.results[0].geometry.location.lng;
      if(!latLon.lat || !latLon.lng) return next(new Error('could not find address. please refine'));
      req.body.latLon = latLon;
      next();
    }).on('error', function() {
      return next(new Error('error finding address'));
    });
 });
};

module.exports = returnLatLon;
