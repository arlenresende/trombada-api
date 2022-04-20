const router = require('express').Router()

// middlewares
const verifyToken = require('../helpers/verify-token')

const PetController = require('../controllers/petsController')
const { imageUpload } = require('../helpers/image-upload')

router.get('/', verifyToken, PetController.getAll)
router.post('/create', verifyToken, PetController.create)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch(
  '/:id',
  verifyToken,
  imageUpload.single('image'),
  PetController.upDatePet
)
module.exports = router
