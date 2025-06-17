import express from 'express'
import { BookController } from '../controller/bookController.js'

const route = express.Router()
route.get('/',BookController.home)
route.get('/category',BookController.formCategory)
route.post('/category',BookController.createCategory)
route.get('/autor',BookController.formAutor)
route.post('/autor',BookController.createAutor)
route.get('/book',BookController.formBook)
route.post('/book',BookController.createBook)

route.get('/autor/:autorId',BookController.formEditAutor)
route.get('/book/:bookId',BookController.formEditBook)

export default route