const {
    SECRET_KEY
} = process.env
const {
    sign,
    verify
} = require('jsonwebtoken')
const db = require('../db/knex')

function createToken(id) {
    const sub = {
        sub: {
            id
        }
    }
    const options = {
        expiresIn: '10 days'
    }

    return sign(sub, SECRET_KEY, options)
}
// all tokens are signed with a unique id. 

function parseToken(header) {
    const token = header && header.split('Bearer ')[1]
    return verify(token, SECRET_KEY)
}

function isLoggedIn(req, res, next) {
    try {
        parseToken(req.headers.authorization)
        next()

    } catch (e) {
        next({
            status: 401,
            error: `Session has expired. Please login again.`
        })
    }
}

async function isAuthorizedOrg(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            const message = `You are not authorized to access this route`
            return next({
                status: 401,
                error: message
            })
        }

        const token = parseToken(authorization)
        const orgId = token.sub.id
        console.log("I am orgId", orgId)

        const org = await db('organizations')
            .where({
                id: orgId
            })
            .first()
        if (!org) {
            const message = `You are not authorized`
            return next({
                status: 401,
                error: message
            })
        }

        next()
    } catch (e) {
        console.log(e)
        next({
            status: 401,
            error: `Session has expired. Organization, please log in again.`
        })
    }
}


async function isAuthorizedOrgEvent(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            const message = `You are not authorized to access this route`
            return next({
                status: 401,
                error: message
            })
        }

        const token = parseToken(authorization)
        const orgId = token.sub.id

        const eventId = req.params.id
        const event = await db('events')
            .where({
                id: eventId
            })
            .first()

        if (event.org_id !== orgId) {
            const message = `Your organization is not authorized to update this event`
            return next({
                status: 401,
                error: message
            })
        }
        next()
    } catch (e) {
        console.log(e)
        next({
            status: 401,
            error: `Session has expired. Please log into your organization dashboard again.`
        })
    }
}

async function isAuthorizedUser(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            const message = `You are not authorized to access this route`
            return next({
                status: 401,
                error: message
            })
        }

        const token = parseToken(authorization)
        const userId = token.sub.id

        // const userId = req.params.userId 
        console.log("I am the userId", userId)
        const user = await db('users').where({ id: userId }).first()
        if (!user) {
            const message = `You are not authorized to update this list`
            return next({
                status: 401,
                error: message
            })
        }
        next()
    } catch (e) {
        console.log(e)
        next({ status: 401, error: `Session has expired. User, please log in again.` })

    }
}



module.exports = {
    createToken,
    parseToken,
    isLoggedIn,
    isAuthorizedOrgEvent,
    isAuthorizedUser,
    isAuthorizedOrg
}
