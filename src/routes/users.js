const router = require('express').Router()
const ctrl = require('../controllers/users')

router.get('/', ctrl.getAllUsers)
router.get('/:userId', ctrl.getOneUser)

module.exports = router