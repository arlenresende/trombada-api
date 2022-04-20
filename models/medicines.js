const mongoose = require('../db/conn')
const { Schema } = mongoose

const Medicines = mongoose.model(
  'Medicines',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      hour: {
        type: String,
        required: true,
      },
      lastDay: {
        type: String,
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

module.exports = Medicines
