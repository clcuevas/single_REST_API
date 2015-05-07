'use strict';

var Pet = require('../models/Pet.js');
var bodyparser = require('body-parser');

module.exports = function(router) {
	var query = new Pet({type: 'dog'});

	router.use(bodyparser.json());

	router.get('/pets', function(req, res) {
		Pet.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});//end find
	});//end get method

	//custom query/ method
	router.get('/pets/search', function(req, res) {
		query.findSimilarTypes(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	router.post('/pets', function(req, res) {
		var newPet = new Pet(req.body);
		newPet.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});//end save
	});//end post method

	router.delete('/pets/:id', function(req, res) {
		Pet.remove({'_id': req.params.id}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}

			res.json({msg: 'success'});
		});//end remove method
	});//end delete method
};