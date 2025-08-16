import express from 'express'
import { body,param } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerPlayHistory } from '../controllers/ControllerPlayHistory.js';
import { validateParams } from '../middleware/general.js';
import { validateExistePlayHistory } from '../middleware/querys.js';
import { authenticate } from '../middleware/auth.js';

const route = express.Router()

route.post(
  "/",
  authenticate,
  body("song_id").isNumeric().withMessage("The id song most be numeric"),
  handleInputErrors,
  ControllerPlayHistory.create
);

route.put(
  "/:id",
  authenticate,
  validateParams,
  validateExistePlayHistory,
  body("song_id").isNumeric().withMessage("The id song most be numeric"),
  handleInputErrors,
  ControllerPlayHistory.update
);

route.get(
  "/:id",
  authenticate,
  validateParams,
  validateExistePlayHistory,
  handleInputErrors,
  ControllerPlayHistory.get
);

route.get(
  "/",
  authenticate,
  ControllerPlayHistory.getAll
);


route.delete(
  "/:id",
  authenticate,
  validateParams,
  validateExistePlayHistory,
  handleInputErrors,
  ControllerPlayHistory.delete
);

export default route
