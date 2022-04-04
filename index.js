const express = require('express')
const cors = require('cors')

const UserRoutes = require('./routes/UserRoutes')

const app = express()

// Config Json Responde

app.use(express.json())

// Solve Cors

app.use(cors({ credentials: true, origin: 'http://localhost:9000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)

app.listen(9000)
