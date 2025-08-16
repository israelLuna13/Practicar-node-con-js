import { errorResponse, successResponse } from "../utils/response.js"
import jwt from 'jsonwebtoken'
import { pool } from "../config/db.js"
import { body } from "express-validator"

export const authenticate=async(req,res,next)=>{
    const bearer = req.headers.authorization
    if(!bearer){
        res.status(401).json(successResponse({
            valoration:false,
            message:'Unauthorized',
            data:[]
        }))
        return
    }
    const [text , token] = bearer.split(" ")

    if(!token){
         res.status(401).json(successResponse({
            valoration:false,
            message:'Incorrect Token',
            data:[]
        }))
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(typeof decoded === "object" && decoded.id){
            const data_user = await pool.query(
                `
                SELECT id, name ,email FROM users WHERE id = $1
                `,[decoded.id]
            )
            req.session_user = data_user.rows[0]
            next()   
        }
    } catch (error) {
         res.status(500).json(errorResponse({
            message:'Incorrect Token'        }))
    }
    
}

export const validateToken = async(req,res,next)=>{
     await body("token")
    .isLength({ min: 6 })
    .withMessage("Token is required").run(req)
    next()
}
export const validateExistToken = async(req,res,next)=>{
    const {token}=req.body
    
    try {
        const data_user = await pool.query(
            `
            SELECT * FROM users WHERE token = $1
            `,[token]
        )
        
        if(data_user.rowCount === 0){
              res.status(200).json(successResponse({
                        message:'There are no data',
                        valoration:false,
                        data:[]
                    }))

                    return
        }
        req.user_token = data_user.rows[0]
        next()
        
    } catch (error) {
         res.status(500).json(errorResponse({
            message:'There is an error'        }))
    }
}

