const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/events')

router.get('/', ctrl.getAll)
router.get('/:eventTitle', ctrl.getOne)

module.exports = router