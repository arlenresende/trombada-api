const router = require('express').Router()

const EatTimeController = require('../controllers/eatTimeController')

// middlewares
const verifyToken = require('../helpers/verify-token')

/**
 * @swagger
 * /eattime/{idPet}/create:
 *
 *    post:
 *      description: Use to create a Eat Time
 *      tags:
 *       - Eat Time
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
 *        description: Eat Time registered successfully
 */
router.post('/:IdPet/create', verifyToken, EatTimeController.create)
/**
 * @swagger
 * /eattime/myeattimes:
 *    get:
 *      description: Use to return all Eat Time
 *      tags:
 *       - Eat Time
 *    responses:
 *      '201':
 *        description: Get my Eat Time successfully
 */
router.get('/myeattimes', verifyToken, EatTimeController.myEatTime)
/**
 * @swagger
 * /eattime/{id}:
 *    delete:
 *      description: Use to Delete a Eat Time
 *      tags:
 *       - Eat Time
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
 *        description: Eat Time deleted successfully
 */
router.delete('/:id', verifyToken, EatTimeController.removeEatTimeById)
/**
 * @swagger
 * /eattime/{id}:
 *    patch:
 *      description: Use to Edit a Eat Time
 *      tags:
 *       - Eat Time
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
 *        description: Eat Time edited successfully
 */
router.patch('/:id', verifyToken, EatTimeController.upDateEatTime)

module.exports = router
