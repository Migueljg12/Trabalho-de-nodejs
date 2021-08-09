import Service from './service.js'
import { CategoryRepository } from '../models/index.js'
import GameService from './games.js'

export default class CategoryService extends Service {
  constructor() {
    super(CategoryRepository)
  }

  async get(filter) {
    return this.repository.find(filter).populate('games')
  }

  async addCategory(category, gameId) {
    if (category != undefined) {
      await this.repository.findOneAndUpdate({ category }, { $push: { game: gameId } }, {
        upsert: true
      })
      return this.repository.findOne({ category })
    } else {
      throw new Error('Jogo criado sem uma categoria')
    }
  }

  async removeGame(gameId) {
    return this.repository.updateMany({ game: gameId }, { $pull: { game: gameId } })

  }

  async delete(category) {
    let gameService = new GameService()
    let cat = await this.repository.findOne(category)
    await gameService.removeCategory(cat._id)
    return this.repository.findOneAndDelete(category)
  }

  async create(category, games) {
    const gameService = new GameService()
    let add = []

    if (games == undefined) { add = {} } else {
      add = { $push: { game: games._id } }
    }

    await this.repository.findOneAndUpdate(category,
      add, { upsert: true })

    const result = !!Object.values(add).length

    if (result === false) { throw new Error('Categoria Criada') } else {
      let cat = await this.repository.findOne(category)
      return await gameService.addGame(cat._id, games)

    }
  }
}
