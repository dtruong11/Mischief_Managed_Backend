const {
    promisify
} = require('util')

const db = require('../db/knex')

const getAll = () => {
    return db('users')
        .returning('*')
        .then((response) => response)
}

const getOne = (userId) => {
    return db('users')
        .where('id', userId)
        .then(response => response)
}


module.exports = {
    getAll,
    getOne
}