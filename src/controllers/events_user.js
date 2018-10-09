const { plural } = require('pluralize')
const model = require('../models/events_user')
// const { parseToken } = require('../lib/auth')

const resourceName = 'event'
const {
    parseToken
} = require('../lib/auth')

/////////////////////////////
// events registration 
////////////////////////////


// get all 
const getRegisteredEvents = async (req, res, next) => {
    try {
        const response = await model.getRegisteredEvents(req.params.userId)
        res.json({
            [plural(resourceName)]: response
        })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not retrieve registered events'
        })
    }
}


// get one 
const getOneRegisteredEvent = async (req, res, next) => {
    try {
        const response = await model.getOneRegisteredEvent(req.params.userId, req.params.eventId)
        res.json({
            [resourceName]: response
        })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not retrieve a single registered event'
        })
    }
}



// create: signup for an event
const registerEvent = async (req, res, next) => {
    try {
        const token = parseToken(req.headers.authorization)
        const user_id = token.sub.id

        const response = await model.registerEvent(user_id, req.params.eventId, req.body)
        
        res.status(200).json({
            [resourceName]: response
        })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Event could not be created`
        })
    }
}

// delete: unregister/ unfavorite 
const unLikeEvent = async (req, res, next) => {
    try {
        const response = await model.unLikeEvent(req.params.eventId)
        res.status(200).json({
            [resourceName]: response
        })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: `Event could not be deleted`
        })
    }
}





/////////////////////////////
// favorite events  
////////////////////////////


// get all 
const getFavorites = async (req, res, next) => {
    try {
        console.log("req.params.userId", req.params.userId)
        const response = await model.getFavorites(req.params.userId)
        res.json({
            [plural(resourceName)]: response
        })
    } catch (e) {
        console.error(e)
        next({
            status: 404,
            error: 'Could not retrieve favorite events'
        })
    }
}

// create
const favEvent = async (req, res, next) => {
    try {
        const response = await model.favEvent(req.params.userId, req.body.event_id)
        res.status(201).json({
            [resourceName]: response
        })
    } catch (e) {
        console.error(e)
        next({
            status: 400,
            error: 'Could not create a favorite event'
        })
    }
}


module.exports = {
    registerEvent,
    unLikeEvent,
    getRegisteredEvents,
    getOneRegisteredEvent,
    getFavorites,
    favEvent
}