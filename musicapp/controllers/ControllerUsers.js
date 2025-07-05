import { pool } from "../config/db.js";
import { errorResponse, successResponse } from "../utils/response.js";

export class ControllerUsers{
    static create = async(req,res)=>{
        const{name,email}=req.body
        try {
            await pool.query(
                `
                INSERT INTO users(name,email) VALUES ($1,$2);
                `,[name,email]
            )
            res.status(201).json(successResponse({
                message:'The user has been created',
                data:[]
            }))
            
        } catch (error) {
            console.log('---------------');
            console.log(error);
            console.log('---------------');
            res.status(500).json(errorResponse({
                message:'There was a issue',
                log:'There was a issue'
            }))
            
        }
    }
     static getAll = async(req,res)=>{
        try {
            const data_users = await pool.query(
                `
                SELECT * FROM users;
                `
            )
            if(data_users.rowCount === 0){
                res.status(200).json(successResponse({
                    valoration:false,
                    data:[],
                    message:'There not are data'
                }))
                return
            }
            res.status(200).json(successResponse({
                message:'Data got successfully',
                data:data_users.rows

            }))
            
        } catch (error) {
            console.log('---------------');
            console.log(error);
            console.log('---------------');
            res.status(500).json(errorResponse({
                message:'There was a issue',
                log:'There was a issue'
            }))
            
        }
    }

     static get = async(req,res)=>{
        const {id} = req.params
        try {
              const data_users = await pool.query(
                `
                SELECT * FROM users WHERE id = $1;
                `,[id]
            )
            if(data_users.rowCount === 0){
                res.status(200).json(successResponse({
                    valoration:false,
                    data:[],
                    message:'There not are data'
                }))
                return
            }
            res.status(200).json(successResponse({
                message:'Data got successfully',
                data:data_users.rows
            }))
        } catch (error) {
            console.log('---------------');
            console.log(error);
            console.log('---------------');
            res.status(500).json(errorResponse({
                message:'There was a issue',
                log:'There was a issue'
            }))
            
        }
    }
     static update = async(req,res)=>{
        const {name,email}=req.body
        const {id} = req.params
        try {
            const data_user = await pool.query(
                `
                SELECT * FROM users WHERE id = $1
                `,[id]
            )
            if(data_user.rowCount === 0){
                res.status(200).json(successResponse({
                    message:'The user does not exit',
                    valoration:false,
                    data:[]
                }))
                return
            }
            await pool.query(`
                UPDATE users SET name = $1, email=$2 WHERE id = $3;
                `,[name,email,id]
            )

            res.status(200).json(successResponse({
                message:'The user has been updated',
                data:[]
            }))
            
        } catch (error) {
            console.log('---------------');
            console.log(error);
            console.log('---------------');
            res.status(500).json(errorResponse({
                message:'There was a issue',
                log:'There was a issue'
            }))
            
        }
    }

     static delete = async(req,res)=>{
         const {id} = req.params
        try {
              const data_user = await pool.query(
                `
                SELECT * FROM users WHERE id = $1
                `,[id]
            )
            if(data_user.rowCount === 0){
                res.status(200).json(successResponse({
                    message:'The user does not exit',
                    valoration:false,
                    data:[]
                }))
                return
            }
            await pool.query(

                `
                DELETE FROM users WHERE id = $1
                `,[id]
            )
               res.status(200).json(successResponse({
                message:'The user has been deleted',
                data:[]
            }))

            
        } catch (error) {
            console.log('---------------');
            console.log(error);
            console.log('---------------');
            res.status(500).json(errorResponse({
                message:'There was a issue',
                log:'There was a issue'
            }))
            
        }
    }
}