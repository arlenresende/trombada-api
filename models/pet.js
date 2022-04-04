const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
  'Pet',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      breed: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },

      user: Object,
      medicines: Object,
      bathTime: Object,
      tourTtime: Object,
      eatingTime: Object,
      notes: Object,
    },
    { timestamps: true }
  )
)

module.exports = Pet
