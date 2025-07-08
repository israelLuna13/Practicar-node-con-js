import { pool } from "../config/db.js"
import { errorResponse,successResponse } from "../utils/response.js";
export class ControllerSongs{

static createSong = async(req,res)=>{
    const {title,duration,album_id}= req.body
    try {
      const data_album = await pool.query(
        `
            select * from albums where id = $1;
            `,
        [album_id]
      );

      if (data_album.rowCount === 0) {
        res.status(500).json(
          errorResponse({
            message: "No se encontro el album",
            log: "No se encontro el album",
          })
        );
        return;
      }

      await pool.query(
        `
            INSERT INTO songs (title,duration,album_id) VALUES ($1,$2,$3)
            `,
        [title, duration, album_id]
      );

      res.status(200).json(
        successResponse({
          message: "Song has been created",
          data: [],
          valoration: true,
        })
      );
    } catch (error) {
      console.log('------------');
        console.log(error);
        console.log('------------');
        res.status(500).json(errorResponse({
        message: "There was a issue",
        log: "There was a issue",
      }));
        
    } 
}    

static updateSong = async(req,res)=>{
   const {title,duration,album_id}= req.body
   const {id}=req.params
  try {
      const data_album = await pool.query(
        `
            select * from albums where id = $1;
            `,
        [album_id]
      );

      if (data_album.rowCount === 0) {
        res.status(500).json(
          errorResponse({
            message: "The album does not exist",
            log: "The album does not exist",
          })
        );
        return;
      }

      await pool.query(
        `
        UPDATE songs
          SET title = $1, duration=$2, album_id = $3
          WHERE id = $4;
        `,[title,duration,album_id,id]
      )

      res.status(200).json(successResponse({
        message:'The song has been updated',
        data:[]
      }))

  } catch (error) {
      console.log('------------');
        console.log(error);
        console.log('------------');
        res.status(500).json(errorResponse({
        message: "There was a issue",
        log: "There was a issue",
      }));
  }
}
static  getAll=async(req,res)=>{
    try {
        const data =await  pool.query(
        `
            SELECT * FROM songs;
        `
    )    
    res.status(200).json(successResponse({
        message:"Songs got successfully",
        data:data.rows,
        valoration:true
    }))
    } catch (error) {
        console.log('------------');
        console.log(error);
        console.log('------------');
        res.status(500).json(errorResponse({
        message: "There was a issue",
        log: "There was a issue",
      }));
        
        
    }
}

static  getSong=async(req,res)=>{
  const data = req.data
    try {
      
    res.status(200).json(successResponse({
        message:"Song got successfully",
        data,
        valoration:true
    }))
    } catch (error) {
        console.log('------------');
        console.log(error);
        console.log('------------');
        res.status(500).json(errorResponse({
        message: "There was a issue",
        log: "There was a issue",
      }));
        
        
    }
}
static deleteSong=async(req,res)=>{
   const {id}=req.params
  try {
      //  const data_song = await pool.query(
      //   `
      //       select * from songs where id = $1;
      //       `,
      //   [id]
      // );

      //  if (data_song.rowCount === 0) {
      //   res.status(500).json(
      //     errorResponse({
      //       message: "The song does not exist",
      //       log: "The song does not exist",
      //     })
      //   );
      //   return;
      // }

      await pool.query(
        `
        DELETE FROM songs WHERE id = $1
        `,[id]
      )

      res.status(200).json(successResponse({
        message:'The song has been deleted',
        data:[]
      }))
  } catch (error) {
     console.log('------------');
        console.log(error);
        console.log('------------');
        res.status(500).json(errorResponse({
        message: "There was a issue",
        log: "There was a issue",
      }));
  }
}

}