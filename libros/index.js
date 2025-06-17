import express from 'express'
import { newPool } from './config/db.js'
import dotenv from 'dotenv'
import book from './routes/route.js'

dotenv.config()
const app = express()

//to enable to read data on forms
//config middleware to process the data of the request http
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.use(csurf({cookie:true}))
//to enabled pug
app.set('view engine','pug')
app.set('views','./views')

//public folder
app.use(express.static('public'))

try {
    const result = await newPool.query('SELECT NOW()')
    console.log(`Conection were successfull to ${result.rows[0].now}`);
    
} catch (error) {
    
        console.log(`There was issue to try connect to postreSql`);
        console.log(error);
}

app.use('/books',book)

const port = 3000 || process.env.port

app.listen(port,()=>{
    console.log(`Server is working on port ${port}`);
    
})