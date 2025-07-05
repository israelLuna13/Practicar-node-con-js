import express from 'express'
import { body,param } from 'express-validator'
import { ControllerAlbums } from '../controllers/ControllerAlbums.js'
import { handleInputErrors } from '../middleware/validate.js'

const route = express.Router()

route.get('/',ControllerAlbums.getAll)
route.get('/:id',
    param('id').isNumeric().withMessage('The id most be numeric'),
    handleInputErrors,
    ControllerAlbums.getById)
route.post('/',
    body('title').notEmpty().withMessage('The title es required'),
    body('release_year').isNumeric().withMessage('The year most be numeric'),
    body('artist_id').isNumeric().withMessage('The id most be numeric'),
    handleInputErrors,
    ControllerAlbums.create)

route.put('/:id',
    body('title').notEmpty().withMessage('The title es required'),
    body('release_year').isNumeric().withMessage('The year most be numeric'),
    body('artist_id').isNumeric().withMessage('The id most be numeric'),
    param('id').isNumeric().withMessage('The id most be numeric'),
    handleInputErrors,
    ControllerAlbums.updateAlbum)
route.delete('/:id',
    param('id').isNumeric().withMessage('The id most be numeric'),
    handleInputErrors,
    ControllerAlbums.deleteAlbum


)

export default route