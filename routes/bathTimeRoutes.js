const router = require('express').Router()

const BathController = require('../controllers/bathController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/:IdPet/create', verifyToken, BathController.create)
router.get('/mybathtimes', verifyToken, BathController.myBathTime)
router.delete('/:id', verifyToken, BathController.removeBathTimeById)
router.patch('/:id', verifyToken, BathController.upDateBathTime)

module.exports = router
