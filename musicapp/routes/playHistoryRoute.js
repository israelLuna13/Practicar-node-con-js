import express from 'express'
import { body,param } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerPlayHistory } from '../controllers/ControllerPlayHistory.js';
import { validateParams } from '../middleware/general.js';
import { validateExistePlayHistory } from '../middleware/querys.js';

const route = express.Router()

route.post(
  "/",
  body("user_id").isNumeric().withMessage("The id user most be numeric"),
  body("song_id").isNumeric().withMessage("The id song most be numeric"),
  handleInputErrors,
  ControllerPlayHistory.create
);

route.put(
  "/:id",
  validateParams,
  validateExistePlayHistory,
  body("user_id").isNumeric().withMessage("The id user most be numeric"),
  body("song_id").isNumeric().withMessage("The id song most be numeric"),
  handleInputErrors,
  ControllerPlayHistory.update
);

route.get(
  "/:id",
  validateParams,
  validateExistePlayHistory,
  handleInputErrors,
  ControllerPlayHistory.get
);

route.get(
  "/",
  ControllerPlayHistory.getAll
);


route.delete(
  "/:id",
  validateParams,
  validateExistePlayHistory,
  handleInputErrors,
  ControllerPlayHistory.delete
);

export default route
