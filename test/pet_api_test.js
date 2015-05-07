'use strict';

//db for testing purposes
process.env.MONGOLAB_URI = 'mongodb://localhost/pet_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Pet = require('../models/Pet.js');

describe('modify existing Pet documents', function() {
  beforeEach(function(done) {
    var petTest = new Pet({name: 'Peanut', owner: 'Claudia', weight: 22, type: 'dog'});
    petTest.save(function(err, data) {
      if(err) throw err;

      this.petTest = data;
      done();
    }.bind(this));//end Pet save
  });//end before each

  it('should verify that before each creates a Pet', function() {
    expect(this.petTest.name).to.eql('Peanut');
    expect(this.petTest).to.have.property('_id');
  });

  it('should DELETE a pet collection', function(done) {
    chai.request('localhost:3000')
      .del('/api/pets/' + this.petTest._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        console.log(res.body.msg);
        expect(res.body.msg).to.equal('success');
        done();
      });
  });//end DELETE test
});