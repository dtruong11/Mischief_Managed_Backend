const {
    parseToken
} = require('../lib/auth')
const model = require('../models/reviews')

const getAllReviews = async (req, res, next) => {
    try {
        let data = await model.getAll(req.params.eventId)
        res.send({ data })
    } catch (e) {
        console.error(e)
        next({ status: 404, error: `Reviews could not be found` })
    }
}

const getOneReview = async (req, res, next) => {
    try {
        let data = await model.getOne(req.params.eventId, req.params.reviewId)
        res.send({
            data
        })
    } catch (e) {
        console.error(e)
        next({ status: 404, error: `Review could not be found` })
    }
}

const postReview = async (req, res, next) => {
    try {
        const token = parseToken(req.headers.authorization)
        const user_id = token.sub.id

        let response = await model.postReview(parseInt(req.params.eventId), user_id, req.body)
        res.status(201).json({ ...response })

    } catch (e) {
        console.error(e)
        next({ status: 400, error: `Review could not be created` })
    }
}

module.exports = {
    getAllReviews,
    getOneReview,
    postReview
}