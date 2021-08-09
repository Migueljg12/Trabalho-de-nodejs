import mongoose from 'mongoose'
const { Schema } = mongoose

const CartSchema = new Schema({
  games: [{
    type: String
  }],
  user: {
    type: String
  },
  payed: {
    type: Boolean,
    default: false
  },
  amount: [{
    type: Number,
    default: 1
  }]
})

export default mongoose.model('cart', CartSchema)
