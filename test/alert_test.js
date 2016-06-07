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
        minutes: '2',
        routeId: 'testID'
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
    // request('localhost:3000')
    //   .post('/alert')
    //   .send({
    //     minutes: '2',
    //     routeId: 'testID'
    //   })
    //   .set('token', token)
    //   .end((err, res) => {
    //     expect(err).to.eql(null);
    //     expect(res.body).to.have.property('_id');
    //     expect(res.body.cbString.length).to.above(10);
    done();
    //   });
  });

  // it('have a callback route from an alert in the db', (done) => {
  //   request('localhost:3000')
  //     .get('/alert/' + testAlert.cbString)
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       done();
  //     });
  // });

  it('return a 404 for a bad alert route', (done) => {
    done();
  });
});
