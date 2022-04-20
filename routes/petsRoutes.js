const router = require('express').Router()

// middlewares
const verifyToken = require('../helpers/verify-token')

const PetController = require('../controllers/petsController')

router.get('/', verifyToken, PetController.getAll)
router.post('/create', verifyToken, PetController.create)

module.exports = router
