module.exports = function () {

//TODO turn in to a real function that can be called after an alert is created 
// in the database


  url = "http://api.pugetsound.onebusaway.org/api/where/register-alarm-for-arrival-and-departure-at-stop/" +
    stopId + '.json?' +
    "key=" + key +
    '&tripId=' + tripId +
    '&serviceDate=' + serviceDate +
    '&vehicleId=' + vehicleId +
    '&stopSequence=' + stopSequence +
    '&alarmTimeOffset=' + alarmTimeOffset +
    '&url=' + callbackUrl
}
