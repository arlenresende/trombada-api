const router = require('express').Router()

const MedicinesController = require('../controllers/medicinesController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/:IdPet/create', verifyToken, MedicinesController.create)
router.get('/mymedicines', verifyToken, MedicinesController.myMedicines)
router.delete('/:id', verifyToken, MedicinesController.removeMedicinesById)
router.patch('/:id', verifyToken, MedicinesController.upDateMedicine)

module.exports = router
