const mongoose = require('../db/conn')
const { Schema } = mongoose

const EatTime = mongoose.model(
  'EatTime',
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
      amount: {
        type: Number,
        required: true,
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

module.exports = EatTime
