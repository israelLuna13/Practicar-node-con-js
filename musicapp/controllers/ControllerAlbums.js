import { pool } from "../config/db.js";
import { successResponse ,errorResponse} from "../utils/response.js";
export class ControllerAlbums{
    static getAll = async(req,res)=>{
        try {
            const data_album = await pool.query(
                `
                SELECT * FROM albums;
                `
            )
            if(data_album.rowCount === 0){
                res.status(500).json(successResponse({
                    message:'There do not data',
                    valoration:false,
                    data:[]
                }))
                return
            }

            res.json(successResponse({
                message:'Data got successfull',
                valoration:true,
                data:data_album.rows
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
    }

    static getById = async(req,res)=>{
        const {id} = req.params
        try {

            const data_album = await pool.query(
                `
                SELECT * FROM albums WHERE id = $1
                `,[id]
            )
            if(data_album.rowCount === 0){
                res.status(200).json(successResponse({
                    message:'There do not are data',
                    valoration:false,
                    data:[]
                }))
                return
            }

            res.status(200).json(successResponse({
                message:'Data got successfull',
                data:data_album.rows
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
    }

    static create= async(req,res)=>{
        const {title,release_year,artist_id}=req.body
        try {
            const data_album = await pool.query(

                `
                 SELECT * FROM artists WHERE id = $1
                `,[artist_id]
            )
            if(data_album.rowCount === 0)
            {
                res.status(200).json(successResponse({
                    message:'The artis does not exist',
                    valoration:false,
                    data:[]
                }))
                return
            }

            await pool.query(
                `
                INSERT INTO albums(title,release_year,artist_id) VALUES($1,$2,$3)
                `,[title,release_year,artist_id]
            )
            res.status(201).json(successResponse({
                message:'The album has been created',
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
    }

    static updateAlbum=async(req,res)=>{
        const {id} = req.params
        const {title,release_year,artist_id}=req.body
        try {
             const data_artist = await pool.query(

                `
                 SELECT * FROM artists WHERE id = $1
                `,[artist_id]
            )
            if(data_artist.rowCount === 0)
            {
                res.status(200).json(successResponse({
                    message:'The artis does not exist',
                    valoration:false,
                    data:[]
                }))
                return
            }

              const data_album = await pool.query(

                `
                 SELECT * FROM albums WHERE id = $1
                `,[id]
            )
            if(data_album.rowCount === 0)
            {
                res.status(200).json(successResponse({
                    message:'The album does not exist',
                    valoration:false,
                    data:[]
                }))
                return
            }

            await pool.query(
                `
                 UPDATE albums SET title = $1 , release_year=$2, artist_id = $3
                 WHERE id = $4;
                `,[title,release_year,artist_id,id]
            )

            res.status(200).json(successResponse({
                message:'The album has been updated',
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
    }

    static deleteAlbum=async(req,res)=>{
        const {id} = req.params
        try {
             const data_album = await pool.query(

                `
                 SELECT * FROM albums WHERE id = $1
                `,[id]
            )
            if(data_album.rowCount === 0)
            {
                res.status(200).json(successResponse({
                    message:'The album does not exist',
                    valoration:false,
                    data:[]
                }))
                return
            }

            await pool.query(
                `
                DELETE FROM albums where id = $1
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
    }
}