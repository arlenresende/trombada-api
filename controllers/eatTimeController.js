const EatTime = require('../models/EatTime')
const Pet = require('../models/pet')

// Helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class EatTimeController {
  // Create a Eat Time

  static async create(req, res) {
    const { title, hour, amount, notes } = req.body

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

    if (!hour) {
      res.status(422).json({ message: 'Hour is required' })
      return
    }
    if (!amount) {
      res.status(422).json({ message: 'Title is required' })
      return
    }

    // Get pet owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const eatTime = new EatTime({
      title,
      hour,
      amount,
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
      const newEatTime = await eatTime.save()
      res
        .status(201)
        .json({ message: 'Eat Time registered successfully', newEatTime })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // Get My Eat Time

  static async myEatTime(req, res) {
    // Get BathTime owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const eatTime = await EatTime.find({ 'user._id': user._id }).sort(
      '-createdAt'
    )
    res.status(200).json({ eatTime })
  }

  // Remove Eat Time

  static async removeEatTimeById(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Check is Id is Valid

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id' })
      return
    }

    // Check is BathTime exists

    const eatTime = await EatTime.findOne({ _id: id })

    if (!eatTime) {
      res.status(404).json({ message: 'Eat Time not found' })
      return
    }

    // check if logged in user registred the Eat Time

    if (eatTime.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    await EatTime.findByIdAndRemove(id)
    res.status(200).json({ message: 'Successfully removed' })
  }

  // Edit BathTime

  static async upDateEatTime(req, res) {
    const { id } = req.params
    const { title, hour, amount, notes } = req.body

    const updatedData = {}

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Id Inválido' })
      return
    }

    // Check is Eat Time exists

    const eatTime = await EatTime.findOne({ _id: id })

    if (!eatTime) {
      res.status(404).json({ message: 'Eat Time not found' })
      return
    }

    // check if logged in user registred the Eat Time

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (eatTime.user._id.toString() !== user._id.toString()) {
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
    if (!amount) {
      res.status(422).json({ message: 'Day is required' })
      return
    } else {
      updatedData.amount = amount
    }
    if (!hour) {
      res.status(422).json({ message: 'Hour is required' })
      return
    } else {
      updatedData.hour = hour
    }

    updatedData.notes = notes

    await EatTime.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Eat Time Updated Successfully' })
  }
}
