import { body } from 'express-validator'

const validationCreateGames = [
  body('gameName')
    .isString()
    .withMessage('O jogo precisa ser uma string')
    .notEmpty()
    .withMessage('É necessário pelo menos um jogo')

]

export { validationCreateGames }
