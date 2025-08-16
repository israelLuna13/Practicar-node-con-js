import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const validateExistAlbum = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data_album = await pool.query(
      `
        select albums.id, albums.title, albums.release_year , artists.name  from albums join artists on  albums.artist_id = artists.id WHERE albums.id = $1
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
              message: "There are no data",
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
                       SELECT likes.id, users.name as user_name, songs.title as song_name FROM likes join users on likes.user_id = users.id join songs on likes.song_id = songs.id WHERE likes.id = $1 ;
                  `,[id]
              );
              if (data_likes.rowCount === 0) {
                res.status(200).json(
                  successResponse({
                    message: "There are no data",
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
                       SELECT play_history.id,play_history.played_at, users.name as user_name, songs.title as song_name FROM play_history join users on play_history.user_id = users.id join songs on play_history.song_id = songs.id WHERE play_history.id = $1;
                  `,[id]
              );
              if (data_history.rowCount === 0) {
                res.status(200).json(
                  successResponse({
                    message: "There are no data",
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
                      SELECT purchases.id,purchases.purchase_date, users.name as user_name, albums.title as album_name FROM purchases join users on purchases.user_id = users.id join albums on purchases.album_id = albums.id WHERE purchases.id = $1;
                  `,[id]
              );
              if (data_purchases.rowCount === 0) {
                res.status(200).json(
                  successResponse({
                    message: "There are no data",
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
export const validateExistUser = async(req,res,next)=>{
  const {email}= req.body
  try {
    const data_user = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
      `,[email]
    )
    if(data_user.rowCount === 0){
      res.status(200).json(
                  successResponse({
                    message: "The email do not exist",
                    valoration: false,
                    data: [],
                  })
                );
                return
    }
          req.data_user= data_user.rows[0]

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
}