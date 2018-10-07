const model = require('../models/orgs')
console.log('this is model', model)

const getAllOrgs = async (req, res, next) => {
    try {
        let data = await model.getAll()
        res.send({ data })
    } catch (e) {
        next({ status: 404, error: `Organizations could not be found` })
    }
}

const getOneOrg = async (req, res, next) => {
    try {
        let data = await model.getOne(req.params.orgId)
        const org = data[0]
        res.send({
            data: org
        })
    } catch (e) {
        next({ status: 404, error: `Organizer could not be found` })
    }
}


const getEventsByOrg = async (req, res, next) => {
    try {
        let data = await model.getEventsByOrg(req.params.orgId)
        res.send({
            data
        })
    } catch (e) {
        next({ status: 404, err: `Events by this organization could not be found` })
    }
}

const createEvent = async (req, res, next) => {
    try {
        let data = await model.createEvent(req.body)
        res.send({
            data
        })
    } catch (e) {
        console.error(e)
        next({ status: 400, err: `Event could not be created` })

    }
}

module.exports = {
    getAllOrgs,
    getOneOrg,
    getEventsByOrg,
    createEvent
}