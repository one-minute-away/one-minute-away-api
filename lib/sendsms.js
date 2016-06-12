'use strict';

const nexmo = require('easynexmo');

nexmo.initialize(process.env.NEXMO_KEY, process.env.NEXMO_SECRET);

module.exports = function (to, message, next) {
  nexmo.sendTextMessage(process.env.NEXMO_NUMBER, to, message, {}, function (err, status) {
    if (next) return (next(err, status));
  });
};
