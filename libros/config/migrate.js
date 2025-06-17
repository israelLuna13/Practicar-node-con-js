import { newPool } from "./db.js";

const createTables = async()=>{
    try {
         await newPool.query(`
        CREATE TABLE IF NOT EXISTS autors(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            country VARCHAR(100)
        );
    `)
    await newPool.query(`
            CREATE TABLE IF NOT EXISTS categorys(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
            );
        `)
    await newPool.query(`
          CREATE TABLE IF NOT EXISTS books(
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          price NUMERIC(10,2) NOT NULL,
          autorId INTEGER REFERENCES autors(id) ON DELETE SET NULL,
          categoryId INTEGER REFERENCES categorys(id) ON DELETE SET NULL
          );
        `)

        await newPool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
            );
            `)
        console.log('The tables was created successfully');
        
    } catch (error) {
        console.log('----------------------------');
        console.log('There was issue create tables');
        console.log(error);
        console.log('----------------------------');
        
    }
    finally{
        await newPool.end()
    }
}
createTables()