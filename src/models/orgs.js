const {
    promisify
} = require('util')

const db = require('../db/knex')
const tableName = 'organizations'
const modelReview = require('./reviews')


const getAll = () => {
    return db(tableName)
        .returning('*')
        .then((response) => response)
}

const getOne = (orgId) => {
    return db(tableName)
        .where('id', orgId)
        .then(response => response)
}

/// GET EVENTS POSTED BY ORG, WITH INFO ABOUT REGISTERED PARENTS, ATTENDING CHILDREN
const getEventsByOrg = (orgId) => {
    return db(tableName)
        .select('events.id AS event_id', '*')
        .join('events', 'events.org_id', '=', 'organizations.id')
        .where({ org_id: orgId })
        .then(events => {
            const result = events.map(async (event) => {
                event.registration = await getRegisteredParents(event.event_id)
                event.reviews = await modelReview.getAll(event.event_id)
                return event
            })
            return Promise.all(result).then(result => result)
        })
}

const createEvent = (body) => {
    const bodyInsert = {
        ...body,
        lat: parseFloat(body.lat),
        long: parseFloat(body.long),
        org_id: parseInt(body.org_id),
        cancelled_at: null
    }

    return db('events')
        .insert(bodyInsert)
        .returning('*')
        .then(([response]) => response)
}

////////////////////////
// helpers 
///////////////////////

const getRegisteredParents = (eventId) => {
    return db('users_events')
        .select('users_events.id AS resgistration_ID', 'users_events.user_id', 'users_events.event_id', 'users.first_name', 'users.last_name', 'users.email AS user_email', 'users.avatar', 'users.city AS user_city', 'users.state AS user_state', 'users_events.notes AS user_notes')
        .join('users', 'users.id', '=', 'users_events.user_id')
        .where({ registered: true, event_id: eventId })
        .then(res => {
            if (res.length > 0) {
                const result = res.map(async (el) => {
                    const children = await getAttending(el.user_id)
                    el.attendingChildren = children
                    return el
                })
                return Promise.all(result).then(res => res)
            }
            return res
        })
        .catch(console.log)
}

const getAttending = (userId) => {
    return db('attendees')
        .select('attendees.name', 'attendees.age')
        .join('users_events', 'users_events.id', '=', 'attendees.registration_id')
        .where({ user_id: userId })
        .then(res => res)
        .catch(console.log)
}

module.exports = {
    getAll,
    getOne,
    getEventsByOrg,
    createEvent
}