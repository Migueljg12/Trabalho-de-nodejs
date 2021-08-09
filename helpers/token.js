import jwt from 'jsonwebtoken'

const { SECRET } = process.env

function generateToken({ _id, name, email, cpf }) {
  let jwtToken = jwt.sign(
    {
      _id,
      name,
      email,
      cpf
    },
    SECRET,
    {
      expiresIn: '24h'
    }
  )

  return jwtToken
}

function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

export { generateToken, verifyToken }
