import { pool } from "../config/db.js";
import { AuthEmail } from "../email/AuthEmail.js";
import { checkPassword, generateJWT, hashPassword } from "../utils/auth.js";
import { errorResponse,successResponse } from "../utils/response.js";
import { generateToken } from "../utils/token.js";

export class ControllerUser{
    static createAccount=async(req,res)=>{
        const {email,password,name}= req.body
        try {
            const data_user = await pool.query(`
                SELECT * FROM users WHERE email = $1;
            `,[email]
            )
            if(data_user.rowCount ==! 0){
                res.status(200).json(successResponse({
                    valoration:false,
                    data:[],
                    message:'The user already exist'
                }))
                return
            }
            const haspPass=await  hashPassword(password)
            const token = generateToken()
        
            await pool.query(
                `INSERT INTO users(name,email,password,token) VALUES ($1,$2,$3,$4)`,[name,email,haspPass,token]
            )
            //send email with token
            await AuthEmail.sendConfirmationEmail({name,email,token})
            res.status(201).json(successResponse({
                message:'The user has been created',
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
     static login=async(req,res)=>{
        const {email,password}= req.body
        try {
            const data_user = await pool.query(`
                SELECT * FROM users WHERE email = $1;
            `,[email]
            )
            
            if(data_user.rowCount ==! 1){
                res.status(200).json(successResponse({
                    valoration:false,
                    data:[],
                    message:'The user already exist'
                }))
                return
            }

            const isCorrectPassword= checkPassword(password,data_user.rows[0].password)
            if(!isCorrectPassword){
                 res.status(200).json(successResponse({
                    valoration:false,
                    data:[],
                    message:'The password is incorrect'
                }))
                return

            }
            const jwt =  generateJWT(data_user.rows[0].id)
            // //send email with token
            res.status(200).json(successResponse({
                message:'Session succefully',
                data:[jwt]
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

    static confirAccount=async(req,res)=>{
        const {user_token}=req
        try {
            await pool.query(`
                UPDATE users SET confirmed = $1, token = $2 WHERE id = $3
                `,[true,null,user_token.id])
             res.status(201).json(successResponse({
                    message:"The account has been confirmed",
                    data:[],
                    valoration:true
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