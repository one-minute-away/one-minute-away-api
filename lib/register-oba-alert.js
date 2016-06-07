'use strict';
const https = require('https');

//TODO get up and running once we have alertObj

module.exports = function (alertObj) {

  const url = 'http://api.pugetsound.onebusaway.org/api/where/register-alarm-for-arrival-and-departure-at-stop/' +
    alertObj.stopId + '.json?' +
    'key=' + process.env.URL.OBA_KEY +
    '&tripId=' + alertObj.tripId +
    '&serviceDate=' + Date.now() +
    //'&vehicleId=' + alertObj.vehicleId +
    '&stopSequence=' + alertObj.stopSequence +
    '&alarmTimeOffset=' + alertObj.alarmTimeOffset +
    '&url=' + process.env.URL + alertObj._id +
    '&onArrival=true'; +
    '&alarm_id=' + alertObj._id;


  https.get(url, (response, err) => {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      return; // somethign good!
    }).on('error', function () {
      return err;
    });
  });
};
