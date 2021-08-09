
export default class Service {
  constructor(repository) {
    this.repository = repository
  }

  async put(query, update) {
    return await this.repository.findOneAndUpdate(query, update, {
      upsert: true,
    })

  }

  async create(obj) {
    let model = this.repository(obj)
    await model.save()
    return model
  }

  async getById(id) {
    return this.repository.findById(id)
  }

  async get(filter) {
    return this.repository.find(filter)
  }

  async delete(_id) {
    try {

      let found = await this.repository.findOne({ _id })
      if (found === null) { throw new Error('_id inexistente') }
      return await this.repository.findOneAndUpdate({ _id }, {
        $set: { active: false }
      })

    } catch ({ message }) {
      throw new Error('_id inexistente')
    }
  }
}
