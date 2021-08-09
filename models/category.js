import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  category: {
    type: String,
  },
  game: [{
    type: Schema.Types.ObjectId,
    ref: 'games',
  }]
})

export default mongoose.model('categories', categorySchema)
