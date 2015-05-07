'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
	name: String,
	owner: String,
	weight: Number,
	type: String
});//end Pet Schema

petSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Pet').find({type: this.type}, cb);
};

//create model
module.exports = mongoose.model('Pet', petSchema);