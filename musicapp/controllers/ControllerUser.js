import { pool } from "../config/db.js";
import { AuthEmail } from "../email/AuthEmail.js";
import { checkPassword, generateJWT, hashPassword } from "../utils/auth.js";
import { errorResponse,successResponse } from "../utils/response.js";
import { generateToken } from "../utils/token.js";

export class ControllerUser {
  static createAccount = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const data_user = await pool.query(
        `
                SELECT * FROM users WHERE email = $1;
            `,
        [email]
      );
      if (data_user.rowCount == !0) {
        res.status(200).json(
          successResponse({
            valoration: false,
            data: [],
            message: "The user already exist",
          })
        );
        return;
      }
      const haspPass = await hashPassword(password);
      const token = generateToken();

      await pool.query(
        `INSERT INTO users(name,email,password,token) VALUES ($1,$2,$3,$4)`,
        [name, email, haspPass, token]
      );
      //send email with token
      await AuthEmail.sendConfirmationEmail({ name, email, token });
      res.status(201).json(
        successResponse({
          message: "The user has been created",
          data: [],
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const data_user = await pool.query(
        `
                SELECT * FROM users WHERE email = $1;
            `,
        [email]
      );

      if (data_user.rowCount == !1) {
        res.status(200).json(
          successResponse({
            valoration: false,
            data: [],
            message: "The user already exist",
          })
        );
        return;
      }

      const isCorrectPassword = await checkPassword(
        password,
        data_user.rows[0].password
      );

      if (!isCorrectPassword) {
        res.status(200).json(
          successResponse({
            valoration: false,
            data: [],
            message: "The password is incorrect",
          })
        );
        return;
      }
      const jwt = generateJWT(data_user.rows[0].id);
      // //send email with token
      res.status(200).json(
        successResponse({
          message: "Session succefully",
          data: [jwt],
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static confirAccount = async (req, res) => {
    const { user_token } = req;
    try {
      await pool.query(
        `
                UPDATE users SET confirmed = $1, token = $2 WHERE id = $3
                `,
        [true, null, user_token.id]
      );
      res.status(200).json(
        successResponse({
          message: "The account has been confirmed",
          data: [],
          valoration: true,
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static forgotPassword = async (req, res) => {
    const { email } = req.body;
    const { data_user } = req;
    try {
      const token_reset = generateToken();

      await pool.query(
        `
                UPDATE users SET token = $1 WHERE email = $2;
                `,
        [token_reset, email]
      );

      await AuthEmail.sendTokenResetPassword({
        email,
        token: token_reset,
        name: data_user.name,
      });
      res.status(200).json(
        successResponse({
          message: "Check your email and follow insrtructions",
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static resetPasswordToken = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const data_user = await pool.query(
        `
                SELECT token , name FROM users WHERE token = $1;
                `,
        [token]
      );
      if (data_user.rowCount === 0) {
        res.status(200).json(
          successResponse({
            valoration: false,
            message: "Incorrect token",
            data: [],
          })
        );
        return;
      }
      const new_pass = await hashPassword(password);

      await pool.query(
        `
            UPDATE users set password = $1, token=$2 WHERE token = $3;
            `,
        [new_pass, null, token]
      );
      res.status(200).json(
        successResponse({
          message: "The password has been updated",
          data: [],
          valoration: true,
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static resetPassword = async (req, res) => {
    const { current_password, new_password } = req.body;
    const { id } = req.session_user;
    try {
      const data_user = await pool.query(
        `
                SELECT * FROM users WHERE id = $1;
                `,
        [id]
      );
      const isCorrectPassword = await checkPassword(
        current_password,
        data_user.rows[0].password
      );
      if (!isCorrectPassword) {
        res.status(200).json(
          successResponse({
            valoration: false,
            message: "Current password is incorrect",
            data: [],
          })
        );
        return;
      }
      const new_pass = await hashPassword(new_password);
      await pool.query(
        `
        UPDATE users SET password = $1 WHERE id = $2
        `,
        [new_pass, id]
      );

      res.status(200).json(
        successResponse({
          message: "The password has been updated",
          data: [],
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static getUSer = async (req, res) => {
    const { session_user } = req;
    res.status(200).json(
      successResponse({
        message: "The user got successfully",
        data: session_user,
      })
    );
  };

  static checkPassword = async (req, res) => {
    const { current_password } = req.body;
    const { id } = req.session_user;
    try {
      const data_user = await pool.query(
        `
                SELECT * FROM users WHERE id = $1;
                `,
        [id]
      );
      const isCorrectPassword = await checkPassword(
        current_password,
        data_user.rows[0].password
      );
      if (!isCorrectPassword) {
        res.status(200).json(
          successResponse({
            valoration: false,
            message: "Current password is incorrect",
            data: [],
          })
        );
        return;
      }
      res.status(200).json(
        successResponse({
          message: "Current password is correct",
          data: [],
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static checktoken = async (req, res) => {
    try {
         res.status(200).json(
        successResponse({
          message: "Token is correct",
          data: [],
        })
      );
    } catch (error) {
      console.log("------------");
      console.log(error);
      console.log("------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };
}