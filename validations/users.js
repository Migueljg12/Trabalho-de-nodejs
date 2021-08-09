import { body } from 'express-validator'
import UserService from '../services/users.js'

const userService = new UserService()

const validationCreateUser = [
  body('name')
    .isString()
    .withMessage('Nome precisa ser uma string')
    .notEmpty()
    .withMessage('Nome é obrigatório'),
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .notEmpty()
    .withMessage('Email é obrigatório'),
  body('cpf')
    .isString()
    .withMessage('CPF precisa ser uma string')
    .notEmpty()
    .withMessage('CPF é Obrigatório')
    .customSanitizer((value) => {
      return value.replaceAll('.', '').replaceAll('-', '')
    })
    .custom(async (value) => {
      const existCpf = await userService.verifyIfUserExist(value)

      if (existCpf) {
        throw new Error('Esse CPF já está cadastrado')
      }
    }),
  body('password')
    .isString()
    .withMessage('Senha precisa ser uma string')
    .notEmpty()
    .withMessage('Senha é obrigatória')
]

export { validationCreateUser }
