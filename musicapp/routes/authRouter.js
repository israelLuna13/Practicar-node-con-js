import express from "express";
import { body, param } from "express-validator";
import { ControllerUser } from "../controllers/ControllerUser.js";
import { handleInputErrors } from "../middleware/validate.js";
import { validateExistUser } from "../middleware/querys.js";
import { authenticate, validateExistToken, validateToken } from "../middleware/auth.js";

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

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("The email is not valid"),
  handleInputErrors,
  validateExistUser,
  ControllerUser.forgotPassword
)

router.post(
  "/reset-password/:token",
  param("token").notEmpty().isLength({min:6}).withMessage("Token is required"),
  body("password").notEmpty().isLength({min:6}).withMessage("The password is very short, most be has minium 6 characters"),
  handleInputErrors,ControllerUser.resetPasswordToken
)

router.post("/reset-password",authenticate ,body("current_password")
  .notEmpty()
  .withMessage("The password is required"),
  body("new_password")
  .notEmpty()
  .withMessage("The password is required")
  .isLength({ min: 6 })
  .withMessage("The new password is very short, most has minium 8 characters"),handleInputErrors,ControllerUser.resetPassword)

  router.get('/user',authenticate,ControllerUser.getUSer)

  router.post(
    "/check-password",
    authenticate,
    body("current_password").notEmpty().withMessage("The password is required"),
    handleInputErrors,
    ControllerUser.checkPassword
  );

    router.post(
    "/check-token",
   validateToken,
    handleInputErrors,
    validateExistToken,
    ControllerUser.checktoken
  );
export default router