import express from 'express'
import { UserService } from '../services/index.js'
import { validationCreateUser } from '../validations/users.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'

const service = new UserService()

const router = express.Router()

const prefix = 'user'

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Api Está Funcionando' })
})

router.post(
  '/create',
  validationCreateUser,
  validator,

  async (req, res) => {
    const { body } = req

    const user = await service.create(body)

    res.status(201).json(user)
  })

router.get('/search/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    const user = await service.getById(id)
    res.status(200).json(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search', auth, async (req, res) => {
  const { query } = req
  try {
    const user = await service.get(query)
    res.status(200).json(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.put('/update/:_id', auth, async (req, res) => {
  const { params } = req
  try {
    const user = await service.put(params, req.body)
    res.status(200).json(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete/:_id', async (req, res) => {
  const { params } = req
  try {
    await service.delete(params)
    res.status(200).json({ success: true })

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

export default {
  controller: router,
  prefix
}
