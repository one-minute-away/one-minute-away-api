'use strict';

const mongoose = require('mongoose');
const randomString = require('../lib/randomstring')


const Alert = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  cbString: String,
  minutes: {
    type: Number,
    required: true
  },
  routeId: String
});


Alert.pre('save', true, function (next, done) {
  this.cbString = randomString(20)
  next();
  done();
});

module.exports = mongoose.model('alert', Alert);
