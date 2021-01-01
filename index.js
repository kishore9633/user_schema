const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./model/models')


//I nitialize express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Connecting to DB
mongoose.connect('mongodb://localhost:27017/userdata', {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
	console.log('connected to db')
}).catch((error) => {
	console.log(error)
})


// Reading a Uder from userdata

app.get('/:id', (req, res) =>{
	User.findById(req.params.id, (err, user) =>{
		res.send(user)
	})
})

// Adding a User to userdata
app.post('/', (req, res) => {
	name = req.body.name,
	email = req.body.email,
	password = req.body.password,
	role = req.body.role

	let newUser = new User({
		name: name,
		email: email,
		password: password,
		role: role
	})

	newUser.save().then((User) => {
		res.send(User)
	}).catch((err) => {
		console.log(error)
	})
})

// Updating the User

app.post('/update/:id', (req, res) => {
	let User = {}
	if (req.body.name) User.name = req.body.name
	if (req.body.email) User.email = req.body.email
	if (req.body.password) User.password = req.body.password
	if (req.body.role) User.role = req.body.role

	User = { $set: User }

	User.update({_id: req.params.id}, User).then(() => {
		res.send(User)
	}).catch((err) => {
		console.log(error)
	})
})


// Deleting the User from userdata

app.delete('/delete/:id', (req, res) => {
	User.deleteOne({_id: req.params.id}).then(() => {
		res.send('user deleted')
	}).catch((err) => {
		console.log(error)
	})
})

// Initialize the sever
app.listen(3000, () => {
    console.log('sever listening on port:3000');
});
