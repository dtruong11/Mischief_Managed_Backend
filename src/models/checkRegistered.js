const db = require('../db/knex')

const checkRegistered = async (user_id, event_id) => {
    const registeredEvent = await db('users_events').where({
        user_id,
        event_id,
        registered: true
    }).first()
    if (registeredEvent) {
        return true
    }
    return false
}

module.exports = {
    checkRegistered
}