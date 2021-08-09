import mongoose from 'mongoose'
import { hash, verify } from '../helpers/crypto.js'

const { Schema } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true
  },
  cpf: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true
  },
  roles: {
    type: Array,
    of: String,
    default: ['default']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }

})

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password)

  next()
})

UserSchema.statics.verifyUser = async function (email, password) {
  const user = await this.findOne({ email }).select('+password')

  if (verify(password, user.password)) {
    return user
  }

  return null
}

export default mongoose.model('users', UserSchema)
