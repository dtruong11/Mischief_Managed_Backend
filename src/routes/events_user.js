const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/events_user')

router.get('/favorites', ctrl.getFavorites)
router.post('/favorites', ctrl.favEvent) // put the event_id in req.body 

router.get('/', ctrl.getRegisteredEvents)
router.get('/:eventId', ctrl.getOneRegisteredEvent)
router.post('/', ctrl.registerEvent) // eventId in request body 
router.delete('/:eventId', ctrl.unLikeEvent) 




module.exports = router