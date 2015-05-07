'use strict';

var Pet = require('../models/Pet.js');
var bodyparser = require('body-parser');

module.exports = function(router) {
	router.use(bodyparser.json());

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