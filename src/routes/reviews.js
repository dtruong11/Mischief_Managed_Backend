const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/reviews')
const auth = require('../lib/auth')

router.get('/', ctrl.getAllReviews)
router.post('/', auth.isLoggedIn, auth.isAuthorizedUser, ctrl.postReview)
router.get('/:reviewId', ctrl.getOneReview)

module.exports = router