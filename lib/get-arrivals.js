'use strict';
//Cool to use native http, I'd consider a library considering you're using it
//heavily. I like SuperAgent but there are a lot of options.
const http = require('http');

module.exports = exports = function(req, res, next) {
  if(!req.body.leadTime) return next(new Error('no lead time on arrivals request'));
  if(!req.route_id) return next(new Error('no route_id on arrivals request'));
  if(!req.stop_id) return next(new Error('no stop_id on arrivals request'));
  let newDateObj = new Date(new Date().getTime() + req.body.leadTime*60000).getTime();
  //querystring
  let obaURL = 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/'
              + req.stop_id
              + '.json?key='
              + process.env.OBA_KEY
              + '&time='
              + newDateObj
              + '&minutesBefore=0&minutesAfter=60';
  http.get(obaURL, (response, err) => {
    let arrivals = '';
    response.on('data', (chunk) => {
      arrivals += chunk;
    });
    response.on('end', () => {
      if(err) return next(new Error('problem with one bus away accessing'));
      arrivals = JSON.parse(arrivals).data.entry.arrivalsAndDepartures;
      let filteredArrivals = arrivals.filter((arrival) => {
        return arrival.routeId === req.route_id;
      });
      if (filteredArrivals.length > 1) {
        filteredArrivals = filteredArrivals.reduce((a, b) => {
          if (a.scheduledArrivalTime < b.scheduledArrivalTime) {
            return a;
          } else {
            return b;
          }
        });
      } else if (filteredArrivals.length == 0) {
        return next(new Error('no trips returned for these parameters'));
      } else {
        filteredArrivals = filteredArrivals[0];
      }
      //here I probably would have set an object as a property to req and
      //then set the data there. That would allow you to set assign one object
      //with the various properties when you assigned it rather than a whole
      //set of dot assignments. The tradeoff is that it would be a little more
      //verbose where you accessed the data later but it would be more concise
      //and encapsulated.
      req.tripId = filteredArrivals.tripId;
      req.stopSequence = filteredArrivals.stopSequence;
      req.serviceDate = filteredArrivals.serviceDate;
      req.vehicleId = filteredArrivals.vehicleId;
      req.scheduledArrivalTime = filteredArrivals.scheduledArrivalTime;
      req.predictedArrivalTime = filteredArrivals.predictedArrivalTime;
      req.shortName = filteredArrivals.shortName;
      next();
    });
  });
};
