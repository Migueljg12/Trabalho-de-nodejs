import mongoose from 'mongoose'
const { Schema } = mongoose

const gameSchema = new Schema({
  gameName: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  price: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    default: 1,
  },

  category: [{
    type: Schema.Types.ObjectId,
    ref: 'categories',
    unique: false,
  }]
})

export default mongoose.model('games', gameSchema)
