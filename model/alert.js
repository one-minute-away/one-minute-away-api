'use strict';

const mongoose = require('mongoose');

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
  fireDateTime: Date,
  serviceDate: Date

});

module.exports = mongoose.model('alert', Alert);
