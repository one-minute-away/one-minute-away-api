'use strict';

const chai = require('chai');
const expect = chai.expect;
const getStops = require('./../lib/get-stops');

describe('get stops unit testing', () => {
  let req = {};
  req.latLon =  {lat: 47.61156, lng: -122.327618};
  let sampleResponse = {};
  before((done) => {
    getStops(req, sampleResponse, done);
  });
  it('should have returned our stops object with routes objects attached', () => {
    expect(sampleResponse.stopsList[0].routeIds[0]).to.have.property('shortName');
    expect(sampleResponse.stopsList[1].routeIds[0]).to.have.property('longName');
    expect(sampleResponse.stopsList[1].routeIds[0]).to.have.property('id');
    expect(sampleResponse.stopsList[2].routeIds[0]).to.have.property('description');
  });
});
