import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

export class ControllerPlayListSongs {
  static create = async (req, res) => {
    const {playlist_id,song_id}=req.body
    try {
        const data_song = await pool.query(
            `
                SELECT * FROM songs WHERE id = $1
            `,[song_id]
        )

        if(data_song.rowCount === 0){
            res.status(200).json(successResponse({
                message:'The song does not exist',
                valoration:false,
                data:[]
            }))
            return
        }

        const data_playlist = await pool.query(
            `
                SELECT * FROM playlists WHERE id = $1
            `,[playlist_id]
        )

        if(data_playlist.rowCount === 0){
            res.status(200).json(successResponse({
                message:'The playlist does not exist',
                valoration:false,
                data:[]
            }))
            return
        }

        await pool.query(
            `
                INSERT INTO playlist_songs (playlist_id,song_id) VALUES ($1,$2);
            `,[playlist_id,song_id]
        )
        res.status(201).json(successResponse({
                message:'The song has been added to playlist',
                data:[]
            }))

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
        const data_playlist_song = await pool.query(
          `
                SELECT * FROM playlist_songs;
            `
        );
        if (data_playlist_song.rowCount === 0) {
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
            data: data_playlist_song.rows,
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
    // const {id} = req.params
    const data_playlist_song = req.data_playlist_song
    try {
          res.status(200).json(
          successResponse({
            message: "Data got successfully",
            data: data_playlist_song,
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
    const {playlist_id,song_id}=req.body
    const {id}=req.params
    try {
       
        const data_song = await pool.query(
            `
                SELECT * FROM songs WHERE id = $1
            `,[song_id]
        )

        if(data_song.rowCount === 0){
            res.status(200).json(successResponse({
                message:'The song does not exist',
                valoration:false,
                data:[]
            }))
            return
        }

        const data_playlist = await pool.query(
            `
                SELECT * FROM playlists WHERE id = $1
            `,[playlist_id]
        )

        if(data_playlist.rowCount === 0){
            res.status(200).json(successResponse({
                message:'The playlist does not exist',
                valoration:false,
                data:[]
            }))
            return
        }

        await pool.query(
            `
                UPDATE playlist_songs SET playlist_id = $1, song_id =$2 WHERE id = $3;
            `,[playlist_id,song_id,id]
        )
        res.status(201).json(successResponse({
                message:'The song has been updated',
                data:[]
            }))

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
            `
             DELETE FROM playlist_songs WHERE id = $1
            `,[id]
        )
          res.status(200).json(successResponse({
                message:'The album has been deleted',
                data:[]
            }))

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
