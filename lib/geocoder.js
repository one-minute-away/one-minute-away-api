'use strict';

const https = require('https');

var returnLatLon = function(input) {
  console.log(input);
  let transInput = input.replace(/ /g, '+');
  let latLon = {};
  console.log(transInput);
  https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + transInput + '&key=AIzaSyBfZaQHik2dijoIwINtPKT-4q-qQMGnLHw', (res, err) => {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var jsonResponse = JSON.parse(body);
      latLon.lat = jsonResponse.results[0].geometry.location.lat;
      latLon.lng = jsonResponse.results[0].geometry.location.lng;
      return LatLon;
    }).on('error', function(e) {
      console.log('Got an error: ');
    });
 });
};

module.exports = returnLatLon;
