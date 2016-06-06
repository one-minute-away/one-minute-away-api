module.exports = function () {

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
