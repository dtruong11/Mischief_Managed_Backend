const db = require('../db/knex')
const tableName = 'events'

const joinTbs = () => {
    return db(tableName)
        .join('organizations', 'organizations.id', '=', 'events.org_id')
}
const getAll = () => {
    return joinTbs()
        .returning('*')
        .then(res => res)
}

const getOne = (eventId) => {
    return joinTbs()
        .where({ id: eventId })
        .first()
}

module.exports = {
    getAll,
    getOne
}