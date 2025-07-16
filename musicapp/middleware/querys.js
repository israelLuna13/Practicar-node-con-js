import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const validateExistAlbum = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data_album = await pool.query(
      `
        SELECT * FROM albums WHERE id = $1
      `,
      [id]
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
    req.data_album = data_album.rows[0]

    next()
  } catch (error) {
     console.log("------------");
     console.log(error);
     console.log("------------");
     res.status(500).json(
       errorResponse({
         message: "There was a issue to try search the album",
         log: "There was a issue",
       })
     );
  }
};

 export const  validateExistArtist = async(req,res,next)=>{
        const {id} = req.params
        try {
               const data =await  pool.query(
                    `
                        SELECT * FROM artists WHERE id = $1;
                    `,[id]
                )    
                if(data.rowCount === 0){
                    res.status(200).json(successResponse({
                        message:'These artist do not exist',
                        valoration:false,
                        data:[]
                    }))

                    return
                }
                req.data = data.rows[0]
                next()
               
        } catch (error) {
                console.log(error);
                    console.log('------------');
                    res.status(500).json(errorResponse({
                    message: "There was a issue to try search the artist",
                    log: "There was a issue",
                  }));
        }
    }

export const  validateExistSongs=async(req,res,next)=>{
    const {id}=req.params
    try {
        const data =await  pool.query(
        `
            SELECT * FROM songs where id = $1;
        `,[id]
    )
    if(data.rowCount === 0){
      res.status(200).json(successResponse({
        message:'These song do not exist',
        valoration:false,
        data:[]
      }))
      return
    }
    req.data = data.rows[0] 
    next()   
   
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

export const validateExistePlaylistSong = async (req, res,next) => {
    const {id} = req.params
    try {
         const data_playlist_song = await pool.query(
          `
                SELECT * FROM playlist_songs WHERE id = $1;
            `,[id]
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
       req.data_playlist_song = data_playlist_song.rows[0]
       next()

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

export const validateExistLikes = async (req, res,next) => {
      const {id} = req.params
    try {
       const data_likes = await pool.query(
                `
                      SELECT * FROM likes WHERE id = $1;
                  `,[id]
              );
              if (data_likes.rowCount === 0) {
                res.status(200).json(
                  successResponse({
                    message: "There not are data",
                    valoration: false,
                    data: [],
                  })
                );
                return;
              }

              req.data_likes = data_likes.rows[0]
              next()
              
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

export const validateExistePlayHistory = async (req, res,next) => {
    const{id}=req.params
    try {
          const data_history = await pool.query(
                `
                      SELECT * FROM play_history WHERE id = $1;
                  `,[id]
              );
              if (data_history.rowCount === 0) {
                res.status(200).json(
                  successResponse({
                    message: "There not are data",
                    valoration: false,
                    data: [],
                  })
                );
                return
              }
               req.data_history= data_history.rows[0]
               next()
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

  export const validateExistPurchase = async (req, res,next) => {
    const{id}=req.params
    try {
          const data_purchases = await pool.query(
                `
                      SELECT * FROM purchases WHERE id = $1;
                  `,[id]
              );
              if (data_purchases.rowCount === 0) {
                res.status(200).json(
                  successResponse({
                    message: "There not are data",
                    valoration: false,
                    data: [],
                  })
                );
                return
              }
               req.data_purchases= data_purchases.rows[0]
               next()
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