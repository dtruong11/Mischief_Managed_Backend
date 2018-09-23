const router = require('express').Router()
const ctrl = require('../controllers/featured')

router.get('/organizations', ctrl.featuredOrgs)
router.get('/events', ctrl.featuredEvents)

module.exports = router