import { body, query } from 'express-validator'

const validationCreateCart = [
  body('games')
    .isString()
    .withMessage('O jogo categoria precisa ser uma string')
    .notEmpty()
    .withMessage('É necessário pelo menos um jogo'),
  body('amount')
    .isNumeric()
    .withMessage('O amount precisa ser um number')
    .notEmpty()
    .withMessage('É necessário pelo menos um amount')

]

const validationParams = [
  query('_id')
    .notEmpty()
    .withMessage('Url precisa receber um _id válido')
]

const validationBody = [
  body()
    .isString()
    .withMessage('Body precisa de um _id válido')
    .notEmpty()
]

export { validationCreateCart, validationParams, validationBody }
