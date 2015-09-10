var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var festivalModel = new Schema({
	name: {
		type: String
	},
	location: {
		type: String
	},
	attended: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Festival', festivalModel);