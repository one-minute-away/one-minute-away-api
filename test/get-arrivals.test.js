//unit testing for get-arrivals

'use strict';

const chai = require('chai');
const expect = chai.expect;
const getArrivals = require('./../lib/get-arrivals');

describe('get-arrivals unit test', () => {
  it('should get a single arrival from input', (done) => {
    let sampleRequest = {stop_id: '1_3036', route_id: '1_100089', body: {leadTime: 5}};
    getArrivals(sampleRequest, null, () => {
      console.log(sampleRequest);
      expect(sampleRequest).to.be.an('object');
      expect(sampleRequest).to.have.property('stop_id');
      expect(sampleRequest).to.have.property('route_id');
      expect(sampleRequest).to.have.property('tripId');
      expect(sampleRequest).to.have.property('stopSequence');
      expect(sampleRequest).to.have.property('vehicleId');
      expect(sampleRequest).to.have.property('serviceDate');
      done();
    });
  });
});
