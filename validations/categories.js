import { body } from 'express-validator'

const validationCreateCategory = [
  body('category')
    .isString()
    .withMessage('A categoria precisa ser uma string')
    .notEmpty()
    .withMessage('É necessário pelo menos uma categoria')

]

export { validationCreateCategory }
