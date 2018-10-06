const {
    promisify
} = require('util')

const db = require('../db/knex')

const getAll = () => {
    return db('organizations')
        .returning('*')
        .then((response) => response)
}

const getOne = (orgId) => {
    return db('organizations')
        .where('id', orgId)
        .then(response => response)
}


module.exports = {
    getAll,
    getOne
}