'use strict';
const http = require('http');

//TODO get up and running once we have alertObj

module.exports = function (req, res, next) {
  let timeOffset = req.body.leadTime * 60;
  const url = 'http://api.pugetsound.onebusaway.org/api/where/register-alarm-for-arrival-and-departure-at-stop/' +
    req.stop_id + '.json?' +
    'key=' + process.env.OBA_KEY +
    '&tripId=' + req.tripId +
    '&serviceDate=' + req.serviceDate +
    //'&vehicleId=' + alertObj.vehicleId +
    '&stopSequence=' + req.stopSequence +
    '&alarmTimeOffset=' + timeOffset +
    '&url=' + process.env.CALLBACK_URL +
    '&onArrival=true'
    + '&alarm_id=' + '123';

  http.get(url, (response, err) => {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      if(err) return next(new Error(err));
      req.alarmId = JSON.parse(body).data.entry.alarmId;
      next();
    });
  });
};
