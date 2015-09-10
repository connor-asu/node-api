var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var db = mongoose.connect('mongodb://localhost/festivalAPI');
var Festival = require('./models/festivalModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

router = require('./routes/festivalRoutes.js')(Festival);

app.use('/api', router);

app.get('/', function(req, res) {
	res.send('Welcome to my API :)');
});

app.listen(port, function() {
	console.log('api running on port ' + port);
});