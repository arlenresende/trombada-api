const express = require('express')
const cors = require('cors')

const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/petsRoutes')
const BathTimeRoutes = require('./routes/bathTimeRoutes')
const EatTimeRoutes = require('./routes/eatTimeRoutes')
const MedicinesRoutes = require('./routes/medicinesRoutes')
const NotesRoutes = require('./routes/notesRoutes')
const TourRoutes = require('./routes/tourRoutes')
const app = express()

// Config Json Responde

app.use(express.json())

// Solve Cors

app.use(cors({ credentials: true, origin: 'http://localhost:9000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.use('/bathtime', BathTimeRoutes)
app.use('/eatTime', EatTimeRoutes)
app.use('/medicines', MedicinesRoutes)
app.use('/notes', NotesRoutes)
app.use('/tour', TourRoutes)
app.listen(9000)
