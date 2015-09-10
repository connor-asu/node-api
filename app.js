var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var db = mongoose.connect('mongodb://localhost/festivalAPI');
var Festival = require('./models/festivalModel');


router.route('/festivals')

	.get(function(req, res) {
		Festival.find(function(err, festivals) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.json(festivals);
			}
		});
	});

app.use('/api', router);

app.get('/', function(req, res) {
	res.send('Welcome to my API :)');
});

app.listen(port, function() {
	console.log('api running on port ' + port);
});