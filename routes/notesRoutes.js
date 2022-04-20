const router = require('express').Router()

const NotesController = require('../controllers/notesController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/:IdPet/create', verifyToken, NotesController.create)
router.get('/mynotes', verifyToken, NotesController.myNotes)
router.delete('/:id', verifyToken, NotesController.removeNotesById)
router.patch('/:id', verifyToken, NotesController.upDateNotes)

module.exports = router
