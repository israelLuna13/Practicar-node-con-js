import { errorResponse, successResponse } from "../utils/response.js";
import { pool } from "../config/db.js";

export class ControllerPurchases {
    
  static create = async (req, res) => {
    const {user_id,album_id} = req.body
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
            message: "The user does not exist",
            valoration: false,
            data: [],
          })
        );
        return;
      }

         const data_album = await pool.query(
          `
             SELECT * FROM albums WHERE id = $1;
                        `,
          [album_id]
        );
        if (data_album.rowCount === 0) {
          res.status(200).json(
            successResponse({
              message: "The album do not exist",
              valoration: false,
              data: [],
            })
          );
          return;
        }

         await pool.query(

            `
            INSERT INTO purchases (user_id,album_id) VALUES($1,$2);
            `,[user_id,album_id]
        )

         res.status(201).json(
         successResponse({
                  message: "The purchase was added",
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
        const {user_id,album_id} = req.body
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
            message: "The user does not exist",
            valoration: false,
            data: [],
          })
        );
        return;
      }

         const data_album = await pool.query(
          `
             SELECT * FROM albums WHERE id = $1;
                        `,
          [album_id]
        );
        if (data_album.rowCount === 0) {
          res.status(200).json(
            successResponse({
              message: "The album do not exist",
              valoration: false,
              data: [],
            })
          );
          return;
        }

         await pool.query(

            `
            UPDATE purchases SET user_id =$1, album_id=$2 WHERE id =$3;
            `,[user_id,album_id,id]
        )

         res.status(201).json(
         successResponse({
                  message: "The purchase has been updated",
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

   static getAll = async (req, res) => {
    try {
         const data_purchases = await pool.query(
                `
                      SELECT * FROM purchases;
                  `
              );
              if (data_purchases.rowCount === 0) {
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
                  data: data_purchases.rows,
                })
            )
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
    const data_purchases = req.data_purchases
    try {
         
              res.status(200).json(
                successResponse({
                  message: "Data got successfully",
                  data: data_purchases,
                })
            )
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

            `DELETE FROM purchases WHERE id = $1`,
            [id]
        )
         res.status(200).json(
                successResponse({
                  message: "The purchases has been deleted",
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
