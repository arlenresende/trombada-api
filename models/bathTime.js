const mongoose = require('../db/conn')
const { Schema } = mongoose

const BathTime = mongoose.model(
  'BathTime',
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
      },
      latitude: {
        type: Number,
        required: false,
      },
      longitude: {
        type: Number,
        required: false,
      },
      notes: {
        type: String,
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

module.exports = BathTime
