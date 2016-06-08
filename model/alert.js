'use strict';
const mongoose = require('mongoose');
//const RegisterObaAlert = require('../lib/register-oba-alert');

const Alert = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  alertTimeOffset: {
    type: Number,
    required: true
  },
  routeId: {
    type: String,
    required: true
  },
  tripId: String,
  stopSequence: Number,
  fireDateTime: Date

});

// Alert.post('save', true, function (next, done) {
//   //TODO after alert is created then call the function in ../lib/register-oba-alert
//   // with alet object as argments
//   //RegisterObaAlert(this);
//   next();
//   done();
// });
//
// Alert.pre('save', true, function (next, done) {
//   next();
//   done();
// });

module.exports = mongoose.model('alert', Alert);
