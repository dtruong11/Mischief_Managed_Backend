const model = require('../models/featured')

const showFeatured = (table, res, next) => {
    return model.getFeatured(table)
        .then(data => res.status(200).json({ data }))
        .catch(err => next(err))

}
const featuredOrgs = (req, res, next) => {
    let table = 'organizations'
    showFeatured(table, res, next)
}


const featuredEvents = (req, res, next) => {
    let table = 'events'
    showFeatured(table, res, next)
}

module.exports = {
    featuredOrgs,
    featuredEvents
}