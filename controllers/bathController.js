const BathTime = require('../models/bathTime')
const Pet = require('../models/pet')

// Helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class BathTimeController {
  // Create a BathTime

  static async create(req, res) {
    const { day, hour, title, latitude, longitude, notes } = req.body

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
    if (!day) {
      res.status(422).json({ message: 'Day is required' })
      return
    }
    if (!hour) {
      res.status(422).json({ message: 'Hour is required' })
      return
    }

    // Get pet owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const bathTime = new BathTime({
      day,
      hour,
      title,
      latitude,
      longitude,
      notes,
      IdPet,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    try {
      const newBathTime = await bathTime.save()
      res
        .status(201)
        .json({ message: 'Bath Time registered successfully', newBathTime })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // Get My BathTime

  static async myBathTime(req, res) {
    // Get BathTime owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const bathTime = await BathTime.find({ 'user._id': user._id }).sort(
      '-createdAt'
    )
    res.status(200).json({ bathTime })
  }

  // Remove BathTime

  static async removeBathTimeById(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Check is Id is Valid

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id' })
      return
    }

    // Check is BathTime exists

    const bathTime = await BathTime.findOne({ _id: id })

    if (!bathTime) {
      res.status(404).json({ message: 'Bath Time not found' })
      return
    }

    // check if logged in user registred the BathTime

    if (bathTime.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    await BathTime.findByIdAndRemove(id)
    res.status(200).json({ message: 'Successfully removed' })
  }

  // Edit BathTime

  static async upDateBathTime(req, res) {
    const { id } = req.params
    const { day, hour, title, latitude, longitude, notes } = req.body

    const updatedData = {}

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Id Inválido' })
      return
    }

    // Check is BathTime exists

    const bathTime = await BathTime.findOne({ _id: id })

    if (!bathTime) {
      res.status(404).json({ message: 'Bath Time not found' })
      return
    }

    // check if logged in user registred the Bath Time

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (bathTime.user._id.toString() !== user._id.toString()) {
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
    if (!day) {
      res.status(422).json({ message: 'Day is required' })
      return
    } else {
      updatedData.day = day
    }
    if (!hour) {
      res.status(422).json({ message: 'Hour is required' })
      return
    } else {
      updatedData.hour = hour
    }
    updatedData.latitude = latitude
    updatedData.longitude = longitude
    updatedData.notes = notes

    await BathTime.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Bath Time Updated Successfully' })
  }
}
