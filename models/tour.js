const mongoose = require('../db/conn')
const { Schema } = mongoose

const Tour = mongoose.model(
  'Tour',
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
      hour: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      longitude: {
        type: Number,
        required: false,
      },
      latitude: {
        type: Number,
        required: false,
      },
      IdPet: {
        type: String,
        required: true,
      },
      user: Object,
      pet: Object,
    },
    { timestamps: true }
  )
)

module.exports = Tour
