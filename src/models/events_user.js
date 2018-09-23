const db = require('../db/knex')
const tableName = 'users_events'

/////////////////////////////
// helpers function 
////////////////////////////

// find event 
const find = (userId, eventId) => {
    return db(tableName)
        .where({
            event_id: eventId,
            user_id: userId
        })
        .first()
}

// join table
const joinTbs = (tableName) => {
    return db(tableName)
        .join('events', 'events.id', '=', 'users_events.event_id')
        .join('organizations', 'organizations.id', '=', 'events.org_id')
}

// 

/////////////////////////////
// events registration 
////////////////////////////

// A user registers for an event 
// => POST (populate) / PATCH users_events 
const registerEvent = async (userId, eventId) => {
    const eventFound = await find(userId, eventId)
    if (eventFound) {
        return db(tableName)
            .update({
                ...eventFound,
                registered: true
            })
            .returning('*')
            .then(([res]) => res)
    } else {
        return db(tableName)
            .insert({
                user_id: userId,
                event_id: eventId,
                favorite: false,
                registered: true
            })
            .returning('*')
            .then(([res]) => res)
    }
}
const getRegisteredEvents = (userId) => {
    try {
        console.log("YOOOO", userId)
        return joinTbs(tableName)
            .where({ registered: true, user_id: userId })
            .returning('*')
            .then(res => res)
    } catch (e) {
        console.log("YOOO")
        console.error(e)
        Promise.reject(e)
    }
}

const getOneRegisteredEvent = (userId, eventId) => {
    return joinTbs(tableName)
        .where({ registered: true, user_id: userId, event_id: eventId })
        .first()
}

// Someone unregisters/ unlike an event = DELETE the event 
const unLikeEvent = (userId, eventId) => {
    return db(tableName)
        .where({ user_id: userId, event_id: eventId })
        .del()
        .returning('*')
        .then(([res]) => res)
}
/////////////////////////////
// favorite events  
////////////////////////////

const favorited = (eventId, userId) => {
    return db(tableName)
        .where({
            event_id: eventId,
            user_id: userId,
            favorite: true
        })
        .first()
}

// A user likes an event = POST & populate users_events 
const favEvent = async (userId, eventId) => {
    const found = await favorited(eventId, userId)
    if (!found) {
        const bodyInsert = {
            event_id: eventId,
            user_id: userId,
            favorite: true,
            registered: false
        }
        return joinTbs(tableName)
            .insert(bodyInsert)
            .returning('*')
            .then(([res]) => res)
    }
}

// A user unlikes an event = DELETE from users_events 


// Retrieve all favorite events = GET ALL 
const getFavorites = (userId) => {
    console.log("getFavorites", userId)
    return joinTbs(tableName)
        .where({ user_id: userId, favorite: true })
        .returning('*')
        .then(res => res)
}

module.exports = {
    registerEvent,
    unLikeEvent,
    getRegisteredEvents,
    getOneRegisteredEvent,
    getFavorites,
    favEvent
}