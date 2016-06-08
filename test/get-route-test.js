'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const dbPort = process.env.MONGOLAB_URI;
const mongoose = require('mongoose');
const getRoutes = require('./../lib/get-route');

require('./../server.js');

describe('get-route unit test', () => {
  let token = '';
  let savedId = '';
  let userId = '';
  before((done) => {
    request('localhost:3000')
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: 'ZTestuser',
        password: 'password',
        phoneNumber: '555555555',
        email: 'test@test.com'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  before((done) => {
    request('localhost:3000')
    .post('/alert/saveRoute')
    .set('Content-Type', 'application/json')
    .set('token', token)
    .send({
      nickname: 'nickname',
      route_id: '1_00034',
      stop_id: '1_02312'
    })
    .end((err, res) => {
      if (err) console.log(err);
      savedId = res.body.routes[0]._id;
      userId = res.body._id;
      done();
    });
  });
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  //TODO please provide a better description 
  it('should do a thingy', (done) => {
    let sampleRequest = {};
    sampleRequest.params = {};
    sampleRequest.params.id = userId;
    sampleRequest.body = {};
    sampleRequest.body.savedId = savedId;
    getRoutes(sampleRequest, null, () => {
      expect(sampleRequest.stop_id).to.eql('1_02312');
      expect(sampleRequest.route_id).to.eql('1_00034');
      done();
    });
  });
});
