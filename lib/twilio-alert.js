'use strict';

const twilioClient = require('../twilio-client');
const User = require('../model/user');

function setMessage(alertTime) {
  return 'ALERT! Your bus will be arriving in '
+ alertTime + 'minutes. Have a great ride!';
}

exports.notifyOnAlertTimer = function(timeHit, req, res, next) {
  const messageToSend = setMessage(timeHit.message);
  twilioClient.sendSms(User.phoneNumber, messageToSend);
  next(timeHit);
};
