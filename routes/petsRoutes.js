const router = require('express').Router()

// middlewares
const verifyToken = require('../helpers/verify-token')

const PetController = require('../controllers/petsController')
const { imageUpload } = require('../helpers/image-upload')

/**
 * @swagger
 * /pets:
 *    get:
 *      description: Use to return all Pets
 *      tags:
 *       - Pet
 *    responses:
 *      '201':
 *        description: Get Pets successfully
 */
router.get('/', verifyToken, PetController.getAll)
/**
 * @swagger
 * /pets/create:
 *
 *    post:
 *      description: Use to create a Pet
 *      tags:
 *       - Pet
 *    parameters:
 *      - idPet: customer
 *        in: path
 *        description: Pet ID
 *        required: true
 *        name: idPet
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Pet registered successfully
 */
router.post('/create', verifyToken, PetController.create)

/**
 * @swagger
 * /pets/{id}:
 *    get:
 *      description: Use to get a Unique Pet
 *      tags:
 *       - Pet
 *    parameters:
 *      - id: customer
 *        in: path
 *        description: Pet ID
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Get a Pet successfully
 */

router.get('/:id', PetController.getPetById)

/**
 * @swagger
 * /pet/{id}:
 *    delete:
 *      description: Use to Delete a Pet
 *      tags:
 *       - Pet
 *    parameters:
 *      - id: customer
 *        in: path
 *        description: Pet ID
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Pet deleted successfully
 */

router.delete('/:id', verifyToken, PetController.removePetById)

/**
 * @swagger
 * /pet/{id}:
 *    patch:
 *      description: Use to Edit a Pet
 *      tags:
 *       - Pet
 *    parameters:
 *      - id: customer
 *        in: path
 *        description: Pet ID
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Pet edited successfully
 */

router.patch(
  '/:id',
  verifyToken,
  imageUpload.single('image'),
  PetController.upDatePet
)
module.exports = router
