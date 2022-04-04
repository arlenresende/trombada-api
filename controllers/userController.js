const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const { decode } = require('jsonwebtoken')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body
    let image = ''

    // validations

    if (!name) {
      res.status(422).json({ message: 'Name is required' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'Email is required' })
      return
    }
    if (!phone) {
      res.status(422).json({ message: 'Phone number required' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'Password is required' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'Password Confirmation is required' })
      return
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'Password and confirmation must match' })
      return
    }

    // Check if user exists

    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'User already registered in the system' })
      return
    }

    // Create a Password

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create User

    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    })

    try {
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'Email is required' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'Password is required' })
      return
    }

    // check if user exist

    const user = await User.findOne({ email: email })

    if (!user) {
      res
        .status(422)
        .json({ message: 'There is no user registered with this email.' })
      return
    }

    // chek if password match with db password

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({ message: 'Invalid password' })
      return
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id
    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado' })
      return
    }

    res.status(200).json({ user })
  }

  static async editUser(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    const { name, email, phone, password, confirmpassword } = req.body
    let image = ''

    if (req.file) {
      user.image = req.file.filename
    }

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' })
      return
    }

    user.name = name
    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' })
      return
    }

    const userExists = await User.findOne({ email: email })

    // Check if email has already taken
    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro email' })
      return
    }

    user.email = email

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório' })
      return
    }

    user.phone = phone

    if (password !== confirmpassword) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais' })
      return
    } else if (password === confirmpassword && password != null) {
      // Create a Password

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
    }

    try {
      // return user updated Data

      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      )
      res.status(200).json({ message: 'usuário atualizado com sucesso' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
