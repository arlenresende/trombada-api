const Notes = require('../models/Notes')
const Pet = require('../models/pet')

// Helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class NotesController {
  // Create a Note

  static async create(req, res) {
    const { title, description } = req.body

    const { IdPet } = req.params

    if (!ObjectId.isValid(IdPet)) {
      res.status(422).json({ message: 'Invalid Pet ID' })
      return
    }

    const pet = await Pet.findById(IdPet)

    if (!pet) {
      res.status(422).json({ message: 'Pet not find' })
    }

    // validations
    if (!title) {
      res.status(422).json({ message: 'Title is required' })
      return
    }

    if (!description) {
      res.status(422).json({ message: 'Description is required' })
      return
    }

    // Get pet owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const notes = new Notes({
      title,
      description,
      IdPet,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    try {
      const newNotes = await notes.save()
      res
        .status(201)
        .json({ message: 'Notes registered successfully', newNotes })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // Get My Notes

  static async myNotes(req, res) {
    // Get Notes owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const notes = await Notes.find({ 'user._id': user._id }).sort('-createdAt')
    res.status(200).json({ notes })
  }

  // Remove Notes

  static async removeNotesById(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Check is Id is Valid

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id' })
      return
    }

    // Check is Notes exists

    const notes = await Notes.findOne({ _id: id })

    if (!notes) {
      res.status(404).json({ message: 'Notes  not found' })
      return
    }

    // check if logged in user registred the Notes

    if (notes.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    await Notes.findByIdAndRemove(id)
    res.status(200).json({ message: 'Successfully removed' })
  }

  // Edit Notes

  static async upDateNotes(req, res) {
    const { id } = req.params
    const { title, description } = req.body

    const updatedData = {}

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID' })
      return
    }

    // Check is Notes exists

    const notes = await Notes.findOne({ _id: id })

    if (!notes) {
      res.status(404).json({ message: 'Notes not found' })
      return
    }

    // check if logged in user registred the Notes

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (notes.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    // validations

    if (!title) {
      res.status(422).json({ message: 'Title is required' })
      return
    } else {
      updatedData.title = title
    }
    if (!description) {
      res.status(422).json({ message: 'Description is required' })
      return
    } else {
      updatedData.description = description
    }

    await Notes.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Notes Updated Successfully' })
  }
}
