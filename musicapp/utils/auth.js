import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = async(data)=>{
const salt = await bcrypt.genSalt(10)
return await bcrypt.hash(data,salt)
}

export const checkPassword = async(data,hash)=>{
    return await bcrypt.compare(data,hash)
}
export const generateJWT = (id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })

    return token
}