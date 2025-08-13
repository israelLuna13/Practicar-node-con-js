import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerLikes } from '../controllers/ControllerLikes.js'
import { validateParams } from '../middleware/general.js'
import { validateExistLikes } from '../middleware/querys.js'
import { authenticate } from '../middleware/auth.js'

const route = express.Router()

route.post('/',
    authenticate,
    body('song_id').isNumeric().withMessage('The id song most be numeric'),
    handleInputErrors,
    ControllerLikes.create
)
route.put('/:id',
    authenticate,
    validateParams,
    validateExistLikes,
    body('song_id').isNumeric().withMessage('The id song most be numeric'),
    handleInputErrors,
    ControllerLikes.update
)
route.get('/:id',authenticate,validateParams,validateExistLikes,handleInputErrors,ControllerLikes.get)
route.get('/',authenticate,ControllerLikes.getAll)
route.delete('/:id',authenticate,validateParams,validateExistLikes,handleInputErrors,ControllerLikes.delete)

export default route
