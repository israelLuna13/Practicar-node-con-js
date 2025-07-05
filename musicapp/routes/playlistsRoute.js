import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { validateParams } from '../middleware/general.js'
import { ControllerPlayLists } from '../controllers/ControllerPlayList.js'
const route = express.Router()

route.post('/',
    body('name').notEmpty().withMessage('The name is required'),
    body('user_id').isNumeric().withMessage('The user id most be numeric'),
    handleInputErrors,
    ControllerPlayLists.create
)
route.put('/:id',
     body('name').notEmpty().withMessage('The name is required'),
    body('user_id').isNumeric().withMessage('The user id most be numeric'),
    validateParams,
    handleInputErrors,
    ControllerPlayLists.update
)
route.get('/',ControllerPlayLists.getAll)
route.get('/:id',validateParams,handleInputErrors,ControllerPlayLists.get)
route.delete('/:id',validateParams,handleInputErrors,ControllerPlayLists.delete)

export default route