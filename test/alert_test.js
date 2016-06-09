'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const Alert = require('../model/alert');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('Alerts should', () => {
  let testUser;
  let token;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq',
      phoneNumber: '9196066201',
      email: 'test@test.com',
      routes: [{nickname: 'work to home', stop_id: '1_3036', route_id: '1_100089'}]
    });
    newUser.save((err, user) => {
      testUser = user;
      token = jwt.sign({
        _id: testUser._id
      }, secret);
      User.findOne({_id: testUser._id}, (err, user) => {
        testUser.savedRouteId = user.routes[0]._id;
      });
      let newAlert = new Alert({
        userId: testUser._id,
        alertTimeOffset: '42',
        routeId: 'testID',
        tripId: 'test_trip_idd'
      });
      newAlert.save((err) => {
        if (err) return err;
        done();
      });
    });
  });
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('allow a user to create an alert', (done) => {
    request('localhost:3000')
      .post('/user/' + testUser._id + '/alert')
      .send({
        routeId: 'test_route_id',
        userId: testUser._id,
        savedRouteId: testUser.savedRouteId,
        tripId: 'test_trip_id',
        leadTime: 5
      })
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect((JSON.parse(res.res.body).code)).to.eql(200);
        done();
      });
  });

  it('allow a user to get a list of their alerts', (done) => {
    request('localhost:3000')
      .get('/user/' + testUser._id + '/alert')
      .set('token', token)
      .send({
        alertTimeOffset: '42',
        routeId: 'test_route_id',
        userId: testUser._id,
        tripId: 'test_trip_idd'
      })
      // .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0].alertTimeOffset).to.eql(42);
        done();
      });
  });
});
