const model = require('../models/orgs')
console.log('this is model', model)

const getAllOrgs = async (req, res, next) => {
    try {
        let data = await model.getAll()
        res.send({ data })
    } catch (e) {
        next({ status: 400, error: `Organizations could not be found` })
    }
}

const getOneOrg = async (req, res, next) => {
    try {
        let data = await model.getOne(req.params.orgId)
        res.send({
            data
        })
    } catch (e) {
        next({ status: 400, error: `Organizer could not be found` })
    }
}


module.exports = {
    getAllOrgs,
    getOneOrg
}