import { newPool } from "../config/db.js";

export async function getAutor(){
    const autors = await newPool.query(`SELECT * FROM autors;`)
    return autors
}
export async function getCategorys(){
   const categorys = await  newPool.query(`SELECT * FROM categorys;`)
   return categorys
}
export async function deleteBook(idBook){
     await newPool.query(
      `
       DELETE FROM books where id = $1
      `,[idBook]
    )
}