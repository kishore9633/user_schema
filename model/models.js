const mongoose = require('mongoose')

// Schema for userdata
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
})

//Creating the collection User
const User = mongoose.model('User', userSchema)

module.exports = User;