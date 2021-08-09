import express from 'express'
import GameService from '../services/games.js'
import { validationCreateGames } from '../validations/games.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'

const service = new GameService()

const router = express.Router()

const prefix = 'game'

router.post('/create', auth, validationCreateGames, validator, async (req, res) => {
  const { category, ...rest } = req.body
  try {
    const game = await service.create(category, rest)

    res.status(201).json(game)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search', async (req, res) => {
  const { query } = req
  try {
    const game = await service.get(query)
    res.status(200).json(game)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    const game = await service.getById(id)
    res.status(200).json(game)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.put('/update/:_id', auth, async (req, res) => {
  const { params, body } = req
  try {
    const game = await service.put(params, body)
    res.status(200).json(game)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete', auth, async (req, res) => {
  const { body } = req
  try {
    const user = await service.delete(body)
    res.status(200).send(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete/:_id', auth, async (req, res) => {
  const { params } = req
  try {
    const user = await service.delete(params)
    res.status(200).send(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

export default {
  controller: router,
  prefix
}
