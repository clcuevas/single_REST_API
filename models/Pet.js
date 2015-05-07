'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
	name: String,
	owner: String,
	weight: Number,
	type: String
});//end Pet Schema

//create model
module.exports = mongoose.model('Pet', petSchema);