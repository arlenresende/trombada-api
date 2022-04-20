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

    let image = ''

    if (req.file) {
      image = req.file.filename
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
      image,
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

  static async getAllUserPets(req, res) {
    //get userToken
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')
    res.status(200).json({ pets })
  }

  static async getPetById(req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID' })
      return
    }

    // get Pet by id

    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }
    res.status(200).json({ pet: pet })
  }

  static async removePetById(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Check is Id is Valid

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID' })
      return
    }

    // Check is Pet exists

    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    // check if logged in user registred the pet

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    await Pet.findByIdAndRemove(id)
    res.status(200).json({ message: 'Successfully removed' })
  }

  static async upDatePet(req, res) {
    const id = req.params.id
    const { name, age, weight, color, breed } = req.body

    let image = ''

    if (req.file) {
      image = req.file.filename
    }

    const updatedData = {}

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID' })
      return
    }

    // Check is Pet exists

    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    // check if logged in user registred the pet

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    // validations

    if (!name) {
      res.status(422).json({ message: 'Name is required' })
      return
    } else {
      updatedData.name = name
    }
    if (!age) {
      res.status(422).json({ message: 'Age is required' })
      return
    } else {
      updatedData.age = age
    }

    updatedData.weight = weight
    updatedData.color = color
    updatedData.breed = breed
    updatedData.image = image

    console.log(updatedData)

    await Pet.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Pet Updated Successfully' })
  }
}
