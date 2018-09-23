const router = require('express').Router()
const ctrl = require('../controllers/auth')

router.post('/signup/users', ctrl.signupUser)
router.post('/login/users', ctrl.loginUser)
router.post('/signup/organization', ctrl.signupOrg)
router.post('/login/organizations', ctrl.loginOrg)


module.exports = router