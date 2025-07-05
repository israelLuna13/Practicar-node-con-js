import {validationResult} from 'express-validator'

export const handleInputErrors=(req,res,next)=>{
    let errors = validationResult(req)
    console.log(errors);
    
    if(!errors.isEmpty()){
         res.status(400).json({errors:errors.array()})
         return
    }
    next()
}