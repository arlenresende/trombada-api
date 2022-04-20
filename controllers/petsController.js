const Pet = require('../models/pet')

// Helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
  // Get All pets

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({ pets })
  }
  // Create a Pet

  static async create(req, res) {
    const { name, age, weight, color, breed } = req.body

    if (!name) {
      res.status(422).json({ message: 'Name is required' })
      return
    }
    if (!age) {
      res.status(422).json({ message: 'Age is required' })
      return
    }

    // Get pet owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Create a Pet

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      breed,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({ message: 'Pet registered successfully', newPet })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
