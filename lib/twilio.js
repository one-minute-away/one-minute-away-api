'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const twilio = require('twilio')(accountSid, authToken);
const User = require('../model/user');

twilio.messages.create({
  to: User.phoneNumber,
  from: twilioNumber,
  body: 'Your bus will be arriving in five minutes get your ass in gear!'
}, function(err, message) {
  console.log(message.sid);
});
