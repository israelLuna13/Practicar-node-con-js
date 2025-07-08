import express from 'express'
import { body } from 'express-validator'
import { ControllerPlayListSongs } from '../controllers/ControllerPlaylistSongs.js'
import { handleInputErrors } from '../middleware/validate.js'
import { validateParams } from '../middleware/general.js'
const route = express.Router()

route.post('/',
    body('playlist_id').isNumeric().withMessage('The is most be numeric'),
    body('song_id').isNumeric().withMessage('The is most be numeric'),
    handleInputErrors,
    ControllerPlayListSongs.create
)
route.put('/:id',
    body('playlist_id').isNumeric().withMessage('The is most be numeric'),
    body('song_id').isNumeric().withMessage('The is most be numeric'),
    validateParams,
    handleInputErrors,
    ControllerPlayListSongs.update
)
route.get('/',
    ControllerPlayListSongs.getAll
)
route.get('/:id',
    validateParams,handleInputErrors,
    ControllerPlayListSongs.get
)

route.delete('/:id',
    validateParams,handleInputErrors,
    ControllerPlayListSongs.delete
)


export default route