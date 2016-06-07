'use strict';

//TODO after alert is created then call the function in ../lib/register-oba-alert
// with correct argments

const mongoose = require('mongoose');
const randomString = require('../lib/randomstring')


const Alert = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  cbString: String,
  minutes: {
    type: Number,
    required: true
  },
  routeId: {
    type: String,
    required: true
  }
});

//TODO delete, will use a central call back url and give oba callback and id
Alert.pre('save', true, function (next, done) {
  this.cbString = randomString(20)
  next();
  done();
});

module.exports = mongoose.model('alert', Alert);
