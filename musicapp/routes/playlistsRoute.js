import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { validateParams } from '../middleware/general.js'
import { ControllerPlayLists } from '../controllers/ControllerPlayList.js'
import { authenticate } from '../middleware/auth.js'
const route = express.Router()

route.post('/',
    authenticate,
    body('name').notEmpty().withMessage('The name is required'),
    handleInputErrors,
    ControllerPlayLists.create
)
route.put('/:id',
    authenticate,
     body('name').notEmpty().withMessage('The name is required'),
    validateParams,
    handleInputErrors,
    ControllerPlayLists.update
)
route.get('/',
    authenticate,ControllerPlayLists.getAll)
route.get('/:id',authenticate,validateParams,handleInputErrors,ControllerPlayLists.get)
route.delete('/:id',authenticate,validateParams,handleInputErrors,ControllerPlayLists.delete)

export default route