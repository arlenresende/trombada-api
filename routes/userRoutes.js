const router = require('express').Router()

const UserController = require('../controllers/userController')

// middlewares
const verifyToken = require('../helpers/verify-token')

// Upload Image
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UserController.editUser
)

module.exports = router
