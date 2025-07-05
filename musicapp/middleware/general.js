import {param} from "express-validator";

export const validateParams = async(req,res,next)=>{
    await param('id').isNumeric().withMessage('The id most be numeric').run(req)
    next()
}