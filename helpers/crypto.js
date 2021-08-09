/* eslint-disable space-before-function-paren */
import crypto from 'crypto'

function hash(password) {
  let salt = crypto.randomBytes(8).toString('hex')
  const passwordHashded = crypto.scryptSync(password, salt, 64)

  return `${salt}:${passwordHashded.toString('hex')}`
}

function verify(password, hash) {
  const [salt, passwordHashded] = hash.split(':')

  const passwordBuffer = Buffer.from(passwordHashded, 'hex')

  const passwordSended = crypto.scryptSync(password, salt, 64)

  return crypto.timingSafeEqual(passwordSended, passwordBuffer)
}

export { hash, verify }
