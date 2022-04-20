const router = require('express').Router()

const NotesController = require('../controllers/notesController')

// middlewares
const verifyToken = require('../helpers/verify-token')

/**
 * @swagger
 * /notes/{idPet}/create:
 *
 *    post:
 *      description: Use to create a Note
 *      tags:
 *       - Notes
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
 *        description: Notes registered successfully
 */
router.post('/:IdPet/create', verifyToken, NotesController.create)
/**
 * @swagger
 * /notes/mynotes:
 *    get:
 *      description: Use to return all notes
 *      tags:
 *       - Notes
 *    responses:
 *      '201':
 *        description: Get my Notes successfully
 */
router.get('/mynotes', verifyToken, NotesController.myNotes)
/**
 * @swagger
 * /notes/{id}:
 *    delete:
 *      description: Use to Delete a Note
 *      tags:
 *       - Notes
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
 *        description: Notes deleted successfully
 */
router.delete('/:id', verifyToken, NotesController.removeNotesById)
/**
 * @swagger
 * /notes/{id}:
 *    patch:
 *      description: Use to Edit a Note
 *      tags:
 *       - Notes
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
 *        description: Notes edited successfully
 */
router.patch('/:id', verifyToken, NotesController.upDateNotes)

module.exports = router
