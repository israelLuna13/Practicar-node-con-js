import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerLikes } from '../controllers/ControllerLikes.js'
import { validateParams } from '../middleware/general.js'

const route = express.Router()

route.post('/',
    body('user_id').isNumeric().withMessage('The id user most be numeric'),
    body('song_id').isNumeric().withMessage('The id song most be numeric'),
    handleInputErrors,
    ControllerLikes.create
)
route.put('/:id',
    body('user_id').isNumeric().withMessage('The id user most be numeric'),
    body('song_id').isNumeric().withMessage('The id song most be numeric')
    ,    validateParams,
    handleInputErrors,
    ControllerLikes.update
)
route.get('/:id',validateParams,handleInputErrors,ControllerLikes.get)
route.get('/',ControllerLikes.getAll)
route.delete('/:id',validateParams,handleInputErrors,ControllerLikes.delete)

export default route
