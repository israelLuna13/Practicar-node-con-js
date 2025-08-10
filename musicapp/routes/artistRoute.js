import express from "express";
import { ControllerArtist } from "../controllers/ControllerArtist.js";
import { validateParams } from "../middleware/general.js";
import { handleInputErrors } from "../middleware/validate.js";
import { body } from "express-validator";
import { validateExistArtist } from "../middleware/querys.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate,ControllerArtist.getAll);
router.get(
  "/:id",
  validateParams,
  validateExistArtist,
  handleInputErrors,
  ControllerArtist.get
);
router.post(
  "/",
  body("name").notEmpty().withMessage("The name is required"),
  body("country").notEmpty().withMessage("The country is required"),
  handleInputErrors,
  ControllerArtist.create
);
router.put(
  "/:id",
  validateParams,
  body("name").notEmpty().withMessage("The name is required"),
  body("country").notEmpty().withMessage("The country is required"),
  validateExistArtist,
  handleInputErrors,
  ControllerArtist.update
);
router.delete(
  "/:id",
  validateParams,
  validateExistArtist,
  handleInputErrors,
  ControllerArtist.delete
);

export default router;
