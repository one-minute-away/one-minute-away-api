//TODO Test DELETE /user/:id Removes user with token auth!

//TODO GET /user/:id/alert List users alert’s with token auth!

//TODO POST /user/:id/alert creates alert with token auth!

'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const Alert = require('../model/alert');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
//const expect = chai.expect;
//const request = chai.request;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';
//const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('Alerts should', () => {
  let testUser;
  let token;
  let testAlert;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq',
      phoneNumber: '555555555',
      email: 'test@test.com'
    });
    newUser.save((err, user) => {
      testUser = user;
      token = jwt.sign({
        _id: testUser._id
      }, secret);
      let newAlert = new Alert({
        userId: 'testID',
        alertTimeOffset: '2',
        routeId: 'testID',
        tripId: 'test_trip_idd'
      });
      newAlert.save((err, alert) => {
        testAlert = alert;
        done();
      });
    });

  });
  afterEach((done) => {
    //process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('allow a user to create an alert', (done) => {
    request('localhost:3000')
       .post('user/' + testUser._id + '/alert')
       .send({
        alertTimeOffset: '42',
        routeId: 'test_route_id',
        userId: testUser._id,
        tripId: 'test_trip_id'
       })
       .set('token', token)
       .end((err, res) => {
         expect(err).to.eql(null);
         expect(res.body).to.have.property('_id');
         expect(res.body.alertTimeOut).to.eql(42);
    done();
  });

  it('allow a user to get a list of their alerts', (done) => {
    request('localhost:3000')
       .post('user/' + testUser._id + '/alert')
       .send({
        alertTimeOut: '42',
        routeId: 'test_route_id'
        userId: testUser._id,
        tripId: 'test_trip_idd'
       })
       .set('token', token)
       .end((err, res) => {
         expect(err).to.eql(null);
         expect(res.body).to.have.property('_id');
         expect(res.body.alertTimeOut).to.eql(42);
    done();
  });

});
