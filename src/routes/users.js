const router = require('express').Router()
const ctrl = require('../controllers/users')
const auth = require('../lib/auth')


router.get('/', ctrl.getAllUsers)
router.get('/:userId', auth.isLoggedIn, ctrl.getOneUser)

module.exports = router