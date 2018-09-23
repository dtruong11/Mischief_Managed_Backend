const model = require('../models/users')

const getAllUsers = async (req, res, next) => {
    try {
        let data = await model.getAll()
        res.send({ data })
    } catch (e) {
        next({ status: 400, error: `Users could not be found` })
    }
}

const getOneUser = async (req, res, next) => {
    try {
        let data = await model.getOne(req.params.userId)
        res.send({
            data
        })
    } catch (e) {
        next({ status: 400, error: `User could not be found` })
    }
}


module.exports = {
    getAllUsers,
    getOneUser
}