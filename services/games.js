import GamesRepository from '../models/games.js'
import CategoryService from './categories.js'
import Service from './service.js'

export default class GameService extends Service {
  constructor() {
    super(GamesRepository)
  }

  async get(filter) {
    const { gameName, ...rest } = filter
    let query = this.repository.find().populate({ path: 'category', select: 'category' })

    if (gameName) {
      query = query.find({
        gameName: { $regex: gameName, $options: 'i' }
      })
    }
    query = query.find(rest)

    return query
  }

  async create(category, game) {
    const model = this.repository(game)
    await model.save()

    const categoryService = new CategoryService()
    const retorno = await categoryService.addCategory(category, model._id)

    await this.repository.findOneAndUpdate({ _id: model._id },
      { $push: { category: retorno._id } })
    return this.repository.find(game).populate({ path: 'category', select: 'category' })
  }

  async delete(filter) {
    const game = await this.repository.findOne(filter)
    const categoryService = new CategoryService()
    if (game == null) { throw new Error('Jogo não encontrado') }
    await categoryService.removeGame(game._id)
    return await this.repository.findOneAndDelete(filter)

  }

  async removeCategory(category) {
    return this.repository.updateMany({ category }, { $pull: { category } })
  }

  async addGame(category, game) {
    await this.repository.findOneAndUpdate(game,
      { $push: { category } }
    )
    return await this.repository.findOne(game)
  }

  async checkStock(filter) {
    const { amount, games: _id } = filter
    try {

      const game = await this.repository.findOne({ _id })
      return amount <= game.stock

    } catch (message) {
      throw Error('_id inválido')
    }
  }

  async stockCount(cart) {
    const gameList = await this.repository.find()

    cart.games.forEach((gameId, index) => {
      const gameArray = Object.values(gameList)

      const game = gameArray.find(value => value._id == gameId)

      game.stock = game.stock - cart.amount[index]

      game.save()

    })
  }

  async checkPaying(cart) {
    const gameList = await this.repository.find()

    let checked = cart.games.map((gameId, index) => {
      const gameArray = Object.values(gameList)

      const game = gameArray.find(value => value._id == gameId)

      return game.stock >= cart.amount[index]

    })
    return checked
  }
}
