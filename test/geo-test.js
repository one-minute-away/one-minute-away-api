'use strict';

const chai = require('chai');
// const chaiHTTP = require('chai-http');
// chai.use(chaiHTTP);
const expect = chai.expect;
// const request = chai.request;
const geocoder = require('./../lib/geocoder');

describe('geocoder unit testing', () => {
  let sampleRequest;
  before((done) => {
    sampleRequest = {body: {address: '1020 University Street'}};
    geocoder(sampleRequest, null, done);
  });
  it('should have a latLon property on its body', () => {
    expect(sampleRequest.body).to.have.property('latLon');
    expect(sampleRequest.body.latLon).to.have.property('lat');
    expect(sampleRequest.body.latLon).to.have.property('lng');
    expect(sampleRequest.body.latLon.lat).to.eql(47.61156);
    expect(sampleRequest.body.latLon.lng).to.eql(-122.327618);
  });
});
