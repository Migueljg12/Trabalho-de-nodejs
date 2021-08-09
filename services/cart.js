import { CartRepository } from '../models/index.js'
import Service from './service.js'
import { GameService } from './index.js'

export default class CartService extends Service {
  constructor() {
    super(CartRepository)
  }

  async addCart(game, _id) {

    const cart = await this.repository.findOne({ _id })
    const service = new GameService()
    const stock = await service.checkStock(game)

    if ((cart === null && stock === true) || (cart && (cart.payed && stock === true))) {
      const model = this.repository(game)
      await model.save()
      return model
    }

    const { user, ...rest } = game
    try {
      if (cart.games.includes(game.games) && stock === true) {
        const index = cart.games.findIndex((value) => value == game.games)
        cart.amount[index] = cart.amount[index] + game.amount
        game.amount = cart.amount[index]
        const stock = await service.checkStock(game)

        if (stock == true) {
          const model = this.repository(cart)
          await model.save()
          return model
        } else {
          throw new Error('Não temos a quantidade em estoque')
        }

      }
    } catch ({ message }) {
      throw new Error('Não temos a quantidade em estoque')
    }

    if (stock == true) {
      await this.repository.findOneAndUpdate({ _id: cart._id },
        ({ $push: rest }))
      return this.repository.findOne(_id)
    } else {

      throw new Error('Não temos a quantidade em estoque')
    }

  }

  async paying(id) {
    const cart = await this.repository.findOne(id)
    const service = new GameService()

    const check = await service.checkPaying(cart)

    if (check.includes(false)) {

      throw new Error('Não tem unidades disponiveis')

    } else {

      await service.stockCount(cart)

      return await this.repository.findOneAndUpdate(id, { $set: { payed: true } })
    }
  }

  async delGame(cartId, game) {
    const cart = await this.repository.findOne(cartId)

    const index = cart.games.findIndex(value => value == game)
    cart.games.splice(index, 1)
    cart.amount.splice(index, 1)

    return await cart.save()
  }

  async delete(_id) {
    return await this.repository.findOneAndDelete({ _id })
  }
}
