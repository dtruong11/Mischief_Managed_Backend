const router = require('express').Router()
const ctrl = require('../controllers/checkRegistered')

router.get('/:eventId', ctrl.checkRegistered)
module.exports = router 
