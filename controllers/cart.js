import express from 'express'
import auth from '../middleware/auth.js'
import CartService from '../services/cart.js'
import { validationCreateCart, validationBody } from '../validations/carts.js'
import validator from '../middleware/validate.js'

const service = new CartService()

const router = express.Router()

const prefix = 'cart'

router.get('/search/:_id', async (req, res) => {
  try {
    const { _id } = req.params

    const cart = await service.getById(_id)

    res.status(200).json(cart)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search', async (req, res) => {
  try {
    const { query } = req

    const cart = await service.get(query)

    res.status(200).json(cart)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.post('/add/:_id',
  auth,
  validationCreateCart,
  validator,

  async (req, res) => {

    const { user, params, body } = req
    try {
      const cart = await service.addCart({ user: user._id, ...body }, params)

      res.status(200).json(cart)

    } catch ({ message }) {
      res.status(400).json({ message })
    }
  })

router.post(
  '/add',
  auth,
  validationCreateCart,
  validator,

  async (req, res) => {

    const { user, body } = req

    try {
      const cart = await service.addCart({ user: user._id, ...body })

      res.status(200).json(cart)

    } catch ({ message }) {
      res.status(400).json({ message })
    }
  })

router.post('/paying/:_id', auth, async (req, res) => {

  const { params } = req
  try {

    const body = await service.paying(params)

    res.status(200).send({
      message: 'pagamento confirmado',
      body
    })

  } catch ({ message }) {
    res.status(400).json({ message })
  }

})

router.delete('/delete/game/:_id', auth, async (req, res) => {
  try {
    const { params, body } = req

    const cart = await service.delGame(params, body.games)

    res.status(200).json(cart)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete/:_id', auth, async (req, res) => {
  try {
    const { params } = req

    await service.delete(params)

    res.status(200).json({ sucess: true })

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete', auth, validationBody, validator, async (req, res) => {
  try {
    const { body } = req

    await service.delete(body)

    res.status(200).json({ sucess: true })

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

export default {
  controller: router,
  prefix
}
