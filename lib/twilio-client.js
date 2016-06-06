'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports.sendSms = function(to, message) {
  client.messages.create({
    to: to,
    from: twilioNumber,
    body: message
  }, function(err, message) {
    if(err) {
      console.log(err, 'Could not send alert');
      console.log(message);
    }
    console.log('Alert Sent!');
  });
};
