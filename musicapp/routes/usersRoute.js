import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerUsers } from '../controllers/ControllerUsers.js'
import { validateParams } from '../middleware/general.js'
const route = express.Router()

route.post('/',
    body('name').notEmpty().withMessage('The name is required'),
    body('email').isEmail().withMessage('The email is required'),
    handleInputErrors,
    ControllerUsers.create
)
route.get('/',
    ControllerUsers.getAll
)
route.get('/:id',
    validateParams,
    handleInputErrors,
    ControllerUsers.get
)

route.put('/:id',
    body('name').notEmpty().withMessage('The name is required'),
    body('email').notEmpty().withMessage('The email is required'),
    validateParams,
    handleInputErrors,
    ControllerUsers.update
)
route.delete('/:id',
    validateParams,
    handleInputErrors,
    ControllerUsers.delete
)

export default route