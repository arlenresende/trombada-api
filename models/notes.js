const mongoose = require('../db/conn')
const { Schema } = mongoose

const Notes = mongoose.model(
  'Notes',
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },

      user: Object,
      pet: Object,
    },
    { timestamps: true }
  )
)

module.exports = Notes
