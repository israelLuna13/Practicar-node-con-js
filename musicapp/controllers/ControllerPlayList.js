import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

export class ControllerPlayLists {
  static create = async (req, res) => {
    const { name, user_id } = req.body;
    try {
      const data_users = await pool.query(
        `
                SELECT * FROM users WHERE id = $1;
                `,
        [user_id]
      );
      if (data_users.rowCount === 0) {
        res.status(200).json(
          successResponse({
            valoration: false,
            data: [],
            message: "The user do not exist",
          })
        );
        return;
      }
      await pool.query(
        `
                INSERT INTO playlists(name,user_id) VALUES ($1,$2);
                `,
        [name, user_id]
      );
      res.status(201).json(
        successResponse({
          message: "The play list has been created",
          data: [],
        })
      );
    } catch (error) {
      console.log("---------------");
      console.log(error);
      console.log("---------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static getAll = async (req, res) => {
    try {
      const data_playlists = await pool.query(
        `
              SELECT * FROM playlists;
              `
      );

      if (data_playlists.rowCount === 0) {
        res.status(200).json(
          successResponse({
            message: "There not are data",
            valoration: false,
            data: [],
          })
        );
        return;
      }

      res.status(200).json(
        successResponse({
          message: "Data got successfully",
          data: data_playlists.rows,
        })
      );
    } catch (error) {
      console.log("---------------");
      console.log(error);
      console.log("---------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static get = async (req, res) => {
    const { id } = req.params;
    try {
      const data_playlists = await pool.query(
        `
              SELECT * FROM playlists WHERE id = $1;
              `,
        [id]
      );

      if (data_playlists.rowCount === 0) {
        res.status(200).json(
          successResponse({
            message: "There not are data",
            valoration: false,
            data: [],
          })
        );
        return;
      }

      res.status(200).json(
        successResponse({
          message: "Data got successfullt",
          data: data_playlists.rows,
        })
      );
    } catch (error) {
      console.log("---------------");
      console.log(error);
      console.log("---------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static update = async (req, res) => {
    const { name, user_id } = req.body;
    const { id } = req.params;
    try {
      const data_playlists = await pool.query(
        `
              SELECT * FROM playlists WHERE id = $1;
              `,
        [id]
      );

      if (data_playlists.rowCount === 0) {
        res.status(200).json(
          successResponse({
            message: "There not are data",
            valoration: false,
            data: [],
          })
        );
        return;
      }

      const data_users = await pool.query(
        `
                SELECT * FROM users WHERE id = $1;
                `,
        [user_id]
      );
      if (data_users.rowCount === 0) {
        res.status(200).json(
          successResponse({
            valoration: false,
            data: [],
            message: "The user do not exist",
          })
        );
        return;
      }

      await pool.query(
        `
              UPDATE playlists SET name=$1,user_id=$2 WHERE id = $3;
              `,
        [name, user_id, id]
      );

      res.status(200).json(
        successResponse({
          message: "The play list has been updated",
          data: [],
        })
      );
    } catch (error) {
      console.log("---------------");
      console.log(error);
      console.log("---------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      const data_playlists = await pool.query(
        `
              SELECT * FROM playlists WHERE id = $1;
              `,
        [id]
      );

      if (data_playlists.rowCount === 0) {
        res.status(200).json(
          successResponse({
            message: "The play list does not exist",
            valoration: false,
            data: [],
          })
        );
        return;
      }

      await pool.query(
        `
              DELETE FROM playlists WHERE id = $1
              `,
        [id]
      );

      res.status(200).json(
        successResponse({
          message: "The playlist has been deleted",
          data: [],
        })
      );
    } catch (error) {
      console.log("---------------");
      console.log(error);
      console.log("---------------");
      res.status(500).json(
        errorResponse({
          message: "There was a issue",
          log: "There was a issue",
        })
      );
    }
  };
}
