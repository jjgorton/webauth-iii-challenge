const db = require('../data/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find() {
	return db('users').select('id', 'username', 'password', 'department');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('users').where({ id }).first();
}

function add(user) {
	return db('users').insert(user).then((newUser) => findById(newUser));
}

function findByDept(user) {
	return db('users').where(user.department);
}
