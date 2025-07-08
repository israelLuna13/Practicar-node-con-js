import { pool } from "../config/db.js";
import { successResponse ,errorResponse} from "../utils/response.js";

export class ControllerArtist{
    static getAll = async(req,res)=>{
        try {
               const data =await  pool.query(
                    `
                        SELECT * FROM artists;
                    `
                )    
                if(data.rowCount === 0){
                    res.status(200).json(successResponse({
                        message:'There do not are artist',
                        valoration:false,
                        data:[]
                    }))

                    return
                }
                res.status(200).json(successResponse({
                    message:"Artists got successfully",
                    data:data.rows,
                    valoration:true
                }))
        } catch (error) {
                console.log(error);
                    console.log('------------');
                    res.status(500).json(errorResponse({
                    message: "There was a issue",
                    log: "There was a issue",
                  }));
        }
    }
     static get = async(req,res)=>{
        const data = req.data
        try {
                res.status(200).json(successResponse({
                    message:"Artist got successfully",
                    data:data,
                    valoration:true
                }))
        } catch (error) {
                console.log(error);
                    console.log('------------');
                    res.status(500).json(errorResponse({
                    message: "There was a issue",
                    log: "There was a issue",
                  }));
        }
    }
     static create = async(req,res)=>{
        const {name,country}=req.body
        try {

            await pool.query(
                `
                INSERT INTO artists(name,country)
                  VALUES ($1,$2);
                `,[name,country]
            )
              res.status(201).json(successResponse({
                    message:"The artist has been created",
                    data:[],
                    valoration:true
                }))
            
        } catch (error) {
                console.log(error);
                    console.log('------------');
                    res.status(500).json(errorResponse({
                    message: "There was a issue",
                    log: "There was a issue",
                  }));
        }
    }
     static update = async(req,res)=>{
                const {name,country}=req.body
                const {id}=req.params

        try {
         
             await pool.query(
                `
                UPDATE artists SET name =$1,country = $2 WHERE id = $3;
                `,[name,country,id]
            )
              res.status(201).json(successResponse({
                    message:"The artist has been updated",
                    data:[],
                    valoration:true
                }))
        } catch (error) {
                console.log(error);
                    console.log('------------');
                    res.status(500).json(errorResponse({
                    message: "There was a issue",
                    log: "There was a issue",
                  }));
        }
    }
     static delete = async(req,res)=>{
        const {id} = req.params
        try {
            
                await pool.query(
                    `
                    DELETE FROM artists WHERE id = $1
                    `,[id]
                )
                  res.status(201).json(successResponse({
                    message:"The artist has been deleted",
                    data:[],
                    valoration:true
                }))
        } catch (error) {
                console.log(error);
                    console.log('------------');
                    res.status(500).json(errorResponse({
                    message: "There was a issue",
                    log: "There was a issue",
                  }));
        }
    }
}