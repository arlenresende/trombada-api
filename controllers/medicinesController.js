const Medicines = require('../models/Medicines')
const Pet = require('../models/pet')

// Helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class MedicinesController {
  // Create a Eat Time

  static async create(req, res) {
    const { name, hour, amount, notes, lastDay } = req.body

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
    if (!name) {
      res.status(422).json({ message: 'Name is required' })
      return
    }

    if (!hour) {
      res.status(422).json({ message: 'Hour is required' })
      return
    }
    if (!lastDay) {
      res.status(422).json({ message: 'Hour is required' })
      return
    }
    if (!amount) {
      res.status(422).json({ message: 'Amount is required' })
      return
    }

    // Get pet owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const medicines = new Medicines({
      name,
      hour,
      amount,
      notes,
      lastDay,
      IdPet,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    try {
      const newMedicines = await medicines.save()
      res
        .status(201)
        .json({ message: 'Medicine registered successfully', newMedicines })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // Get My Medicines

  static async myMedicines(req, res) {
    // Get BathTime owner

    const token = getToken(req)
    const user = await getUserByToken(token)

    const medicines = await Medicines.find({ 'user._id': user._id }).sort(
      '-createdAt'
    )
    res.status(200).json({ medicines })
  }

  // Remove Medicines

  static async removeMedicinesById(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    // Check is Id is Valid

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid Id' })
      return
    }

    // Check is Medicines exists

    const medicines = await Medicines.findOne({ _id: id })

    if (!medicines) {
      res.status(404).json({ message: 'Medicines  not found' })
      return
    }

    // check if logged in user registred the Medicines

    if (medicines.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: 'There was a problem processing your request' })
      return
    }

    await Medicines.findByIdAndRemove(id)
    res.status(200).json({ message: 'Successfully removed' })
  }

  // Edit Medicine

  static async upDateMedicine(req, res) {
    const { id } = req.params
    const { name, hour, amount, notes, lastDay } = req.body

    const updatedData = {}

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid ID' })
      return
    }

    // Check is Eat Time exists

    const medicine = await Medicines.findOne({ _id: id })

    if (!medicine) {
      res.status(404).json({ message: 'Medicine not found' })
      return
    }

    // check if logged in user registred the Eat Time

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (medicine.user._id.toString() !== user._id.toString()) {
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
    if (!lastDay) {
      res.status(422).json({ message: 'last Day is required' })
      return
    } else {
      updatedData.lastDay = lastDay
    }

    updatedData.notes = notes

    await Medicines.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Medicine Updated Successfully' })
  }
}
