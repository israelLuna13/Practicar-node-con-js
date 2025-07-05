import express from 'express'
import { ControllerSongs } from '../controllers/ControllerSongs.js'
import { handleInputErrors } from '../middleware/validate.js'
import { body,param } from 'express-validator'

const route = express.Router()

route.post(
  "/",
  body("title").notEmpty().withMessage("Title is required"),
  body("duration").isNumeric().withMessage("Duration is required"),
  body("album_id").isNumeric().withMessage("Id is required"),
  handleInputErrors,
  ControllerSongs.createSong
);
route.put(
  "/:id",
  body("title").notEmpty().withMessage("Title is required"),
  body("duration").isNumeric().withMessage("Duration is required"),
  body("album_id").isNumeric().withMessage("Id is required"),
  param('id').isNumeric().withMessage("The param id most be numeric"),
  handleInputErrors,
  ControllerSongs.updateSong
);
route.get('/',ControllerSongs.getAll)
route.get('/:id',
  param('id').isNumeric().withMessage("The param id most be numeric"),
  handleInputErrors,
  ControllerSongs.getSong)
  
route.delete('/:id',
  param('id').isNumeric().withMessage("The param id most be numeric",
    
  ),handleInputErrors,
  ControllerSongs.deleteSong
)

export default route