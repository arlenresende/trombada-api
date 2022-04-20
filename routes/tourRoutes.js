const router = require('express').Router()

const TourController = require('../controllers/tourController')

// middlewares
const verifyToken = require('../helpers/verify-token')
/**
 * @swagger
 * /tour/{idPet}/create:
 *
 *    post:
 *      description: Use to create a Tour
 *      tags:
 *       - Tour
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
 *        description: Tour registered successfully
 */
router.post('/:IdPet/create', verifyToken, TourController.create)
/**
 * @swagger
 * /tour/mytour:
 *    get:
 *      description: Use to return all Tour
 *      tags:
 *       - Tour
 *    responses:
 *      '201':
 *        description: Get my Tour successfully
 */
router.get('/mytour', verifyToken, TourController.myTour)
/**
 * @swagger
 * /tour/{id}:
 *    delete:
 *      description: Use to Delete a Tour
 *      tags:
 *       - Tour
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
 *        description: Tour deleted successfully
 */
router.delete('/:id', verifyToken, TourController.removeTourById)
/**
 * @swagger
 * /tour/{id}:
 *    patch:
 *      description: Use to Edit a Tour
 *      tags:
 *       - Tour
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
 *        description: Tour edited successfully
 */
router.patch('/:id', verifyToken, TourController.upDateTour)

module.exports = router
