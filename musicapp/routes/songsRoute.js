import express from 'express'
import { ControllerSongs } from '../controllers/ControllerSongs.js'
import { handleInputErrors } from '../middleware/validate.js'
import { body,param } from 'express-validator'
import { validateExistSongs } from '../middleware/querys.js'
import { validateParams } from '../middleware/general.js'

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
  validateParams,
  validateExistSongs,
  handleInputErrors,
  ControllerSongs.updateSong
);
route.get('/',ControllerSongs.getAll)
route.get('/:id',
  validateParams,
  validateExistSongs,
  handleInputErrors,
  ControllerSongs.getSong)
  
route.delete('/:id',
validateParams,validateExistSongs,handleInputErrors,
  ControllerSongs.deleteSong
)
export default route