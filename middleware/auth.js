import { verifyToken } from '../helpers/token.js'
import { UserService } from '../services/index.js'

let userService = new UserService()

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let user = verifyToken(token)

    let exist = await userService.verifyIfUserExist(user.cpf)

    if (exist === false) {
      throw new Error()
    }
    req.user = user

    next()

  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' })
  }

}
