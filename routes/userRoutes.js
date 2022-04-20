const router = require('express').Router()

const UserController = require('../controllers/userController')

// middlewares
const verifyToken = require('../helpers/verify-token')

// Upload Image
const { imageUpload } = require('../helpers/image-upload')

/**
 * @swagger
 * /register:
 *
 *    post:
 *      description: Use to register a User
 *      tags:
 *       - Users
 *    responses:
 *      '201':
 *        description: User registered successfully
 */
router.post('/register', UserController.register)
/**
 * @swagger
 * /login:
 *
 *    post:
 *      description: Use to Login
 *      tags:
 *       - Users
 *    responses:
 *      '201':
 *        description: Login successfully
 */
router.post('/login', UserController.login)
/**
 * @swagger
 * /users/checkUser:
 *    get:
 *      description: Use to return User is Logged
 *      tags:
 *       - Users
 *    responses:
 *      '201':
 *        description: Get my Users data
 */
router.get('/checkUser', UserController.checkUser)
/**
 * @swagger
 * /users/id:
 *    get:
 *      description: Use to return User Data Login
 *      tags:
 *       - Users
 *    responses:
 *      '201':
 *        description: Get my Users data
 */
router.get('/:id', UserController.getUserById)
/**
 * @swagger
 * /users/edit/{id}:
 *    patch:
 *      description: Use to Edit a User
 *      tags:
 *       - Users
 *    parameters:
 *      - id: customer
 *        in: path
 *        description: User ID
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Users edited successfully
 */
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UserController.editUser
)

module.exports = router
