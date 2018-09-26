const { plural } = require('pluralize')
const model = require('../models/events')

const resourceName = 'event'

const getAll = async (req, res, next) => {
    try {
        if (req.query.lat) {
            console.log(req.query)
            
        } else {
            const response = await model.getAll()
            res.json({
                [plural(resourceName)]: response
            })
        }
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retrieve all events'
        })
    }
}

const getOne = async (req, res, next) => {
    try {
        const response = await model.getOne(req.params.eventId)
        res.json({
            [resourceName]: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retrieve a single event'
        })
    }
}


const getEventsByLocation = async(req, res, next) => {
    try {
        const response = await model.getEventsByLocation(req.query.lat, req.query.long)
        res.json({
            [plural(resourceName)]: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 404,
            error: 'Could not retrieve a single event'
        })
    }
}

module.exports = {
    getAll,
    getOne,
    getEventsByLocation
}