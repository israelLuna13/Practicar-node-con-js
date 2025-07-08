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