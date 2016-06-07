'use strict';

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


Alert.pre('save', true, function (next, done) {
  this.cbString = randomString(20)
  next();
  done();
});

module.exports = mongoose.model('alert', Alert);
