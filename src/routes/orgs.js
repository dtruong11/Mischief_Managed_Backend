const router = require('express').Router()
const ctrl = require('../controllers/orgs')
const auth = require('../lib/auth')


router.get('/', ctrl.getAllOrgs)
router.get('/:orgId', auth.isLoggedIn, ctrl.getOneOrg)

module.exports = router