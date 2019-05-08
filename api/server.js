const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./helpers');
const secrets = require('../config/secrets');
const restricted = require('./restricted-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.send("It's Wooorrrkkkiiinnggg!");
});

server.post('/api/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 5);
	user.password = hash;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

server.post('/api/login', (req, res) => {
	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message : `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: `You shall not pass!` });
			}
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

function generateToken(user) {
	const payload = {
		subject  : user.id,
		username : user.username
		//shouldn't need department here because included in db.
	};
	const options = {
		expiresIn : '1h'
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}

server.get('/api/users', restricted, (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

// function checkDepartment(dept) {
// 	return function (req, res, next) {

// 	}
// }

module.exports = server;
