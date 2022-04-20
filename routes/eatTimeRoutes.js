const router = require('express').Router()

const EatTimeController = require('../controllers/eatTimeController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/:IdPet/create', verifyToken, EatTimeController.create)
router.get('/myeattimes', verifyToken, EatTimeController.myEatTime)
router.delete('/:id', verifyToken, EatTimeController.removeEatTimeById)
router.patch('/:id', verifyToken, EatTimeController.upDateEatTime)

module.exports = router
