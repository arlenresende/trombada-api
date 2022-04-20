const Tour = require('../models/tour')
const Pet = require('../models/pet')

// Helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class TourController {
  // Create a Note

  static async create(req, res) {
    const { title, day, hour, description, longitude, latitude } = req.body

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
      res.status(422).json({ message: 'Day is required' })
      return
    }

    // Get pet owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const tour = new Tour({
      title,
      day,
      hour,
      description,
      longitude,
      latitude,
      IdPet,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    try {
      const newTour = await tour.save()
      res.status(201).json({ message: 'Tour registered successfully', newTour })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // Get My Tour

  static async myTour(req, res) {
    // Get Tour owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const tour = await Tour.find({ 'user._id': user._id }).sort('-createdAt')
    res.status(200).json({ tour })
  }

  // Remove Tour

  static async removeTourById(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Check is Id is Valid

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id' })
      return
    }

    // Check is Tour exists

    const tour = await Tour.findOne({ _id: id })

    if (!tour) {
      res.status(404).json({ message: 'Tour  not found' })
      return
    }

    // check if logged in user registred the Notes

    if (tour.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    await Tour.findByIdAndRemove(id)
    res.status(200).json({ message: 'Successfully removed' })
  }

  // Edit Tour

  static async upDateTour(req, res) {
    const { id } = req.params
    const { title, day, hour, description, longitude, latitude } = req.body

    const updatedData = {}

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID' })
      return
    }

    // Check is Tour exists

    const tour = await Tour.findOne({ _id: id })

    if (!tour) {
      res.status(404).json({ message: 'Tour not found' })
      return
    }

    // check if logged in user registred the Tour

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (tour.user._id.toString() !== user._id.toString()) {
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

    await Tour.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Tour Updated Successfully' })
  }
}
