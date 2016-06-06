'use strict';

const twilioClient = require('../lib/twilio-client');

function setMessage(alertTime) {
  return 'ALERT! Your bus will be arriving in '
+ alertTime + 'minutes. Have a great ride!';
}

exports.notifyOnAlertTimer = function(alert) {
  const messageToSend = setMessage(alert.time);
  twilioClient.sendSms(alert.to, messageToSend);
};
