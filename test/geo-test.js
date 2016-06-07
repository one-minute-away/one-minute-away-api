'use strict';

const chai = require('chai');
const expect = chai.expect;
const geocoder = require('./../lib/geocoder');

describe('geocoder unit testing', () => {
  let sampleRequest = {params: {address: ''}};
  before((done) => {
    sampleRequest.params.address = '1020 University Street, Seattle, WA';
    geocoder(sampleRequest, null, done);
  });
  it('should have a latLon property on its body', () => {
    expect(sampleRequest).to.have.property('latLon');
    expect(sampleRequest.latLon).to.have.property('lat');
    expect(sampleRequest.latLon).to.have.property('lng');
    expect(sampleRequest.latLon.lat).to.eql(47.61156);
    expect(sampleRequest.latLon.lng).to.eql(-122.327618);
  });
});
