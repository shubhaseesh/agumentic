const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// collection and schema
let Item = new Schema({
	title: {
		type: String
	},
	image: {
		type: String
	}
});

module.exports = mongoose.model('item', Item);
