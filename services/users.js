import { UserRepository } from '../models/index.js'
import { generateToken } from '../helpers/token.js'
import Service from './service.js'

export default class UserService extends Service {
  constructor() {
    super(UserRepository)
  }

  async get(filter) {
    let { name, ...rest } = filter
    let query = this.repository.find().populate('posts')

    if (name) {
      query = query.find({
        name: { $regex: name, $options: 'i' }, active: true
      })
    }
    query = query.find(rest).find({ active: true })

    return query
  }

  async put(filter, update) {
    return await this.repository.findOneAndUpdate(filter, update, {
      new: true,
    })
  }

  async signin({ email, password }) {
    let user = await this.repository.verifyUser(email, password)

    if (user) {
      return generateToken(user)
    } else {
      throw new Error('Email ou senha inválidos')
    }
  }

  async verifyIfUserExist(cpf) {
    let user = await this.repository.findOne({ cpf, active: true })

    return user ? true : false
  }

}
