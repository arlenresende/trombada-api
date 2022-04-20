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
      },
      color: {
        type: String,
      },
      breed: {
        type: String,
      },
      images: {
        type: Array,
      },

      user: Object,
    },
    { timestamps: true }
  )
)

module.exports = Pet
