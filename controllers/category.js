import express from 'express'
import { CategoryService } from '../services/index.js'
import auth from '../middleware/auth.js'

const service = new CategoryService()

const router = express.Router()

const prefix = 'category'

router.post(
  '/insert/:_id', auth, async (req, res) => {
    const { params } = req
    const { body } = req
    try {
      const category = await service.create(body, params)

      res.status(201).json(category)

    } catch ({ message }) {
      res.status(400).json({ message })
    }
  }
)

router.post(
  '/create', auth, async (req, res) => {

    const { body } = req
    try {
      const category = await service.create(body)

      res.status(201).json(category)

    } catch ({ message }) {
      res.status(400).json({ message })
    }
  }
)

router.get('/search', auth, async (req, res) => {
  const category = req.params
  try {
    const categories = await service.get(category)
    res.status(200).json(categories)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search/:_id', auth, async (req, res) => {
  const { params } = req
  try {
    const categories = await service.getById(params)
    res.status(200).json(categories)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete', auth, async (req, res) => {
  const { body } = req
  try {
    await service.delete(body)
    res.status(200).json({ sucess: true })

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.put('/update', auth, async (req, res) => {
  const { query, body: update } = req
  try {
    const game = await service.put(query, update)
    res.status(200).json(game)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

export default {
  controller: router,
  prefix
}
