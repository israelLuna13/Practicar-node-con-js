import express from "express";
import { body } from "express-validator";
import { ControllerUser } from "../controllers/ControllerUser.js";
import { handleInputErrors } from "../middleware/validate.js";
import { validateExistUser } from "../middleware/querys.js";
import { validateExistToken, validateToken } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("The name is required"),
  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 6 })
    .withMessage("The password is very short, most has minium 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("E-mail is not valid"),
  handleInputErrors,
  ControllerUser.createAccount
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("The password is required"),
  handleInputErrors,
  validateExistUser,
  ControllerUser.login
);

router.post(
  "/confirm-account",
  validateToken,
  handleInputErrors,
  validateExistToken,
  ControllerUser.confirAccount

)
export default router