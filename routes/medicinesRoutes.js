const router = require('express').Router()

const MedicinesController = require('../controllers/medicinesController')

// middlewares
const verifyToken = require('../helpers/verify-token')

/**
 * @swagger
 * /medicines/{idPet}/create:
 *
 *    post:
 *      description: Use to create a Medicines
 *      tags:
 *       - Medicines
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
 *        description: Medicines registered successfully
 */
router.post('/:IdPet/create', verifyToken, MedicinesController.create)
/**
 * @swagger
 * /medicines/mymedicines:
 *    get:
 *      description: Use to return all Medicines
 *      tags:
 *       - Medicines
 *    responses:
 *      '201':
 *        description: Get my Medicines successfully
 */
router.get('/mymedicines', verifyToken, MedicinesController.myMedicines)
/**
 * @swagger
 * /medicines/{id}:
 *    delete:
 *      description: Use to Delete a Medicines
 *      tags:
 *       - Medicines
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
 *        description: Medicines deleted successfully
 */
router.delete('/:id', verifyToken, MedicinesController.removeMedicinesById)
/**
 * @swagger
 * /medicines/{id}:
 *    patch:
 *      description: Use to Edit a Medicines
 *      tags:
 *       - Medicines
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
 *        description: Medicines edited successfully
 */
router.patch('/:id', verifyToken, MedicinesController.upDateMedicine)

module.exports = router
