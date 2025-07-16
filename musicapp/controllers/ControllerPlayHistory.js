import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

export class ControllerPlayHistory {
  static create = async (req, res) => {
    const { user_id, song_id } = req.body;
    try {
      const data_user = await pool.query(
        `
         SELECT * FROM users WHERE id = $1;
                              `,
        [user_id]
      );
      if (data_user.rowCount === 0) {
        res.status(200).json(
          successResponse({
            message: "The user do not exist",
            valoration: false,
            data: [],
          })
        );
        return;
      }

        const data_song = await pool.query(
          `
             SELECT * FROM songs WHERE id = $1;
                        `,
          [song_id]
        );
        if (data_song.rowCount === 0) {
          res.status(200).json(
            successResponse({
              message: "The song do not exist",
              valoration: false,
              data: [],
            })
          );
          return;
        }

        await pool.query(

            `
                INSERT INTO play_history (user_id,song_id) VALUES($1,$2);
            `,[user_id,song_id]
        )

         res.status(201).json(
         successResponse({
                  message: "The play history was added",
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

  static update = async (req, res) => {
    const { user_id, song_id } = req.body;
    const {id} = req.params
    try {
      const data_user = await pool.query(
        `
         SELECT * FROM users WHERE id = $1;
                              `,
        [user_id]
      );
      if (data_user.rowCount === 0) {
        res.status(200).json(
          successResponse({
            message: "The user do not exist",
            valoration: false,
            data: [],
          })
        );
        return;
      }

        const data_song = await pool.query(
          `
             SELECT * FROM songs WHERE id = $1;
                        `,
          [song_id]
        );
        if (data_song.rowCount === 0) {
          res.status(200).json(
            successResponse({
              message: "The song do not exist",
              valoration: false,
              data: [],
            })
          );
          return;
        }

        await pool.query(

            `
            UPDATE play_history SET user_id=$1,song_id = $2 WHERE id = $3
            `,[user_id,song_id,id]
        )

         res.status(201).json(
         successResponse({
                  message: "The play history has been updated",
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

  static get = async (req, res) => {
    const data_history = req.data_history
    try {
        
               res.status(200).json(
                successResponse({
                  message: "Data got successfully",
                  data: data_history
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

  static getAll = async (req, res) => {
    try {
          const data_history = await pool.query(
                `
                      SELECT * FROM play_history;
                  `
              );
              if (data_history.rowCount === 0) {
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
                  data: data_history.rows,
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
  static delete = async (req, res) => {
    const {id} = req.params
    try {
        await pool.query(

            `DELETE FROM play_history WHERE id = $1`,
            [id]
        )
         res.status(200).json(
                successResponse({
                  message: "The play history has been deleted",
                  data:[]
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