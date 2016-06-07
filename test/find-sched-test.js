//integration tests for schedule-routes
'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

require('./../server.js');

describe('find-stops route', () => {
  it('should return an array of stops with arrays of routes attached', (done) => {
    request('localhost:3000')
      .get('/findStops/1020+University+Street,+Seattle,+WA')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.property('code');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('routeIds');
        expect(res.body[0].routeIds).to.be.an('array');
        expect(res.body[0].routeIds[0]).to.be.an('object');
        expect(res.body[0].routeIds[0]).to.have.property('id');
        expect(res.body[0].routeIds[0]).to.have.property('shortName');
        expect(res.body[0].routeIds[0]).to.have.property('description');
        done();
      })
  })
})
