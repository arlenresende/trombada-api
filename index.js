const express = require('express')
const cors = require('cors')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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

// Swagger

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Costumer Trombada API',
      description: 'Costumer Trombada API Information ',
      contact: {
        name: 'Arlen Resende',
      },
      servers: ['http://localhost:9000'],
    },
  },
  apis: ['./routes/*.js', 'app.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.use('/bathtime', BathTimeRoutes)
app.use('/eattime', EatTimeRoutes)
app.use('/medicines', MedicinesRoutes)
app.use('/notes', NotesRoutes)
app.use('/tour', TourRoutes)
app.listen(9000)
