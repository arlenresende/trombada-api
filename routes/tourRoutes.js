const router = require('express').Router()

const TourController = require('../controllers/tourController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/:IdPet/create', verifyToken, TourController.create)
router.get('/mytour', verifyToken, TourController.myTour)
router.delete('/:id', verifyToken, TourController.removeTourById)
router.patch('/:id', verifyToken, TourController.upDateTour)

module.exports = router
