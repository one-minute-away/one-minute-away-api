'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const mongoose = require('mongoose');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'changeme';
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require('../server');

describe('User routes', () => {
  let testUser;
  let token;
  beforeEach((done) => {
    let newUser = new User({
      username: 'testuser',
      password: '$2a$08$pMewnngJdnSYxMz6dVcl8.H6PSiCqGCEP8Gri5zA6asB/qChSFMHq',
      phoneNumber: '555555555',
      email: 'test@test.com',
      routes: []
    });
    newUser.save((err, user) => {
      testUser = user;
      token = jwt.sign({
        _id: testUser._id
      }, secret);
        done();
    });
  });
  afterEach((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should allow a user to access their saved routes', (done) => {
    request('localhost:3000')
      .get('/' + testUserId + '/routes')
      .auth('testUser', 'testUser')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.eql(testuser.routes);
        done();
      });
  });

  it('should allow a user to save a new route' , (done) => {
    request('localhost:3000')
    .post('/' + testUserId + '/routes')
    .auth('testUser', 'testUser')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body).to.eql(testuser.routes);
      done();
    });
  });

//TODO Test POST /user/:id/route - Create new route with auth
//a form of this may exist in save-route.test that can be reused here


//TODO Test DELETE /user/:id/routes/:id Delete a route with auth
