const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/events_user')
const auth = require('../lib/auth')

router.get('/favorites', ctrl.getFavorites)
router.post('/favorites', ctrl.favEvent) // put the event_id in req.body 

// users can see all the registered events 
router.get('/', auth.isLoggedIn, auth.isAuthorizedUser, ctrl.getRegisteredEvents)
router.get('/:eventId', ctrl.getOneRegisteredEvent)

// users can register for events
router.post('/:eventId', auth.isLoggedIn, auth.isAuthorizedUser, ctrl.registerEvent) 
router.delete('/:eventId', ctrl.unLikeEvent)

module.exports = router