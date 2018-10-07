const router = require('express').Router()
const ctrl = require('../controllers/orgs')
const auth = require('../lib/auth')


router.get('/', ctrl.getAllOrgs)
router.get('/:orgId', auth.isLoggedIn, ctrl.getOneOrg)

// get events by organization
router.get('/:orgId/events', auth.isLoggedIn, auth.isAuthorizedOrg, ctrl.getEventsByOrg)
router.post('/:orgId/events', auth.isLoggedIn, auth.isAuthorizedOrg, ctrl.createEvent)
module.exports = router