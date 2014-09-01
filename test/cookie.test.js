var should = require('chai').should(),
  request = require('supertest'),
  mockgoose = require('mockgoose'),
  mongoose = require('mongoose');

mockgoose(mongoose);
var app = require('../web').app,
  Lesson = require('../lib/models/lesson'),
  Fortune = require('../lib/models/fortune');

describe("cookie", function() {
  before(function() {
    mockgoose.reset();

    Lesson.create({
      _id: "53ffcf1d4ea4f76d1b8f223e",
      chinese: "因特网",
      pronunciation: "yintewang",
      english: "internet"
    }, {
      _id: "53ffcf1d4ea4f76d1b8f223f",
      chinese: "狮子狗",
      pronunciation: "shizi gou",
      english: "poodle"
    });

    Fortune.create({
      _id: '53ffcf1d4ea4f76d1b8f223e',
      message: 'Fortune 1'
    }, {
      _id: '53ffcf1d4ea4f76d1b8f223f',
      message: 'Fortune 2'
    }, {
      _id: '53ffcf1d4ea4f76d1b8f2240',
      message: 'Fortune 3'
    });
  });

  it("returns a random cookie", function(done) {
    request(app)
      .get("/v1/cookie")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.length(1);
        res.body[0].should.ownProperty('lesson');
        res.body[0].should.ownProperty('fortune');
        res.body[0].should.ownProperty('lotto');
        done();
      });
  });
});