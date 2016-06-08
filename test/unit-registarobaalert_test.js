//TODO create test

'use strict';

const chai = require('chai');
const expect = chai.expect;
const registerAlert = require('./../lib/register-oba-alert');

describe('register alert unit test', () => {
  it('should return something when we provide it a request with all the right parameters', (done) => {
    let sampleRequest = { stop_id: '1_3036',
                          route_id: '1_100089',
                          body: { leadTime: 5 },
                          tripId: '1_30935750',
                          stopSequence: 25,
                          serviceDate: 1465369200000,
                          vehicleId: '',
                          scheduledArrivalTime: 1465416637000,
                          predictedArrivalTime: 0 };
    let sampleResponse = {};
    registerAlert(sampleRequest, sampleResponse, () => {
      expect(sampleRequest.alarmId).to.be.a('string');
      done();
    })
  })
})
