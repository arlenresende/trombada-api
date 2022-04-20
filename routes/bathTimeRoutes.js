const router = require('express').Router()

const BathController = require('../controllers/bathController')

// middlewares
const verifyToken = require('../helpers/verify-token')

/**
 * @swagger
 * /bathtime/{idPet}/create:
 *    post:
 *      description: Use to create a Bath Time
 *      tags:
 *       - Bath Time
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
 *        description: Bath Time registered successfully
 */
router.post('/:IdPet/create', verifyToken, BathController.create)
/**
 * @swagger
 * /notes/mybathtimes:
 *    get:
 *      description: Use to return all my Bath times
 *      tags:
 *         - Bath Time
 *    responses:
 *      '201':
 *        description: Get my Bath Time successfully
 */
router.get('/mybathtimes', verifyToken, BathController.myBathTime)
/**
 * @swagger
 * /bathtime/{id}:
 *    delete:
 *      description: Use to Delete a Bath Time
 *      tags:
 *       - Bath Time
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
 *        description: Bath Time deleted successfully
 */
router.delete('/:id', verifyToken, BathController.removeBathTimeById)
/**
 * @swagger
 * /bathtime/{id}:
 *    patch:
 *      description: Use to Edit a Bath Time
 *      tags:
 *       - Bath Time
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
 *        description: Bath Time edited successfully
 */
router.patch('/:id', verifyToken, BathController.upDateBathTime)

module.exports = router
