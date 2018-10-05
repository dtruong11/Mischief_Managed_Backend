const { parseToken } = require('../lib/auth')
const model = require('../models/checkRegistered')


const checkRegistered = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        const token = parseToken(req.headers.authorization)
        const user_id = token.sub.id
        const response = await model.checkRegistered(user_id, eventId)
        console.log('response inside controller', response)
        res.status(200).json({
            isRegistered: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: `Failed to check if user is registered`
        })
    }
}

module.exports = {
    checkRegistered
}