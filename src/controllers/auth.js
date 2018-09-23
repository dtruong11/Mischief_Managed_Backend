const model = require('../models/auth')
const auth = require('../lib/auth')

async function signupUser(req, res, next) {
    try {
        const response = await model.signupUser(req.body)
        const token = auth.createToken(response.id)

        res.status(201).json({ token })
    } catch (e) {
        next({ status: 400, error: `User could not be registered` })
    }
}

async function signupOrg(req, res, next) {
    try {
        const response = await model.signupOrg(req.body)
        const token = auth.createToken(response.id)

        res.status(201).json({ token, ...response })
    } catch (e) {
        next({ status: 400, error: `User could not be registered` })
    }
}

async function loginUser(req, res, next) {
    try {
        let tableName = 'users'
        const response = await model.login(req.body, tableName)
        const { id, first_name, last_name, email, avatar, city, state, zip } = response
        const token = auth.createToken(response.id)
        res.json({ token, id, first_name, last_name, email, avatar, city, state, zip })
    } catch (e) {
        next({ status: 401, error: `Email or password is incorrect` })
    }
}

async function loginOrg(req, res, next) {
    try {
        let tableName = 'organizations'
        const response = await model.login(req.body, tableName)
        console.log("I am response", response)
        const { id, name, aboutus, email, logo, street_org, city_org, state_org, zip_org, lat_org, long_org } = response
        const token = auth.createToken(response.id)
        res.json({ token, id, name, aboutus, email, logo, street_org, city_org, state_org, zip_org, lat_org, long_org})
    } catch (e) {
        next({ status: 401, error: `Email or password is incorrect` })
    }
}


module.exports = {
    signupUser,
    signupOrg,
    loginUser,
    loginOrg
}