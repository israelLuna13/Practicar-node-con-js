import { check,validationResult } from "express-validator";
import { newPool } from "../config/db.js";
import { deleteBook, getAutor, getCategorys } from "../helper/dbQuery.js";

export class BookController {
  static home = async (req, res) => {
    const books = await newPool.query(`
     SELECT 
            books.id,
            books.name AS book_name, 
            books.price, 
            autors.name AS autor_name, 
            categorys.name AS category_name 
            FROM books 
            INNER JOIN autors ON books.autorId = autors.id 
            INNER JOIN categorys ON books.categoryId = categorys.id;

      `);
    res.render("home", {
      page: "Home",
      books,
      csrfToken:req.csrfToken()
    });
  };

  static formCategory = (req, res) => {
    res.render("category/FormCategory", {
      page: "Category",
      csrfToken:req.csrfToken(),
    });
  };
  static createCategory = async (req, res) => {
    try {
      await check("name").notEmpty().withMessage("Name is required").run(req);
      let result = validationResult(req);

      if (!result.isEmpty()) {
        return res.render("category/FormCategory", {
          page: "Category",
          notify: { errors: result.array(), success: false },
          csrfToken:req.csrfToken(),
        });
      }
      const { name } = req.body;
      await newPool.query(
        `
            INSERT INTO categorys (name) VALUES ($1)
            `,
        [name]
      );
          res.redirect('/books')
    } catch (error) {
      console.log(error);
      console.log("There was a error");
    }
  };

  static formAutor = async (req, res) => {
   
    res.render("autor/FormAutor", {
      page: "Autor",
      csrfToken:req.csrfToken(),
    });
  };

  static createAutor = async (req, res) => {
    await check("name").notEmpty().withMessage("Name is required").run(req);
    await check("country")
      .notEmpty()
      .withMessage("Country is required")
      .run(req);
    let result = validationResult(req);

    if (!result.isEmpty()) {
      return res.render("autor/FormAutor", {
        page: "Autor",
        notify: { errors: result.array(), success: false },
        csrfToken:req.csrfToken(),
      });
    }
    const { name, country } = req.body;

    await newPool.query(
      `
            INSERT INTO autors (name,country) VALUES ($1,$2)
            `,
      [name, country]
    );
    res.redirect('/books')
  };

  static formBook = async (req, res) => {
    const autores = await newPool.query(`
        SELECT * FROM autors;
        `);
    const categorys = await newPool.query(`
        SELECT * FROM categorys;
        `);
    res.render("books/FormBooks", {
      page: "books",
      autores,
      categorys,
      csrfToken:req.csrfToken(),
    });
  };

  static createBook = async (req, res) => {
   try {
     await check("name").notEmpty().withMessage("Name is required").run(req);
     await check("price").isNumeric().withMessage("Price is required").run(req);
     await check("autorId")
       .isNumeric()
       .withMessage("Autor is required")
       .run(req);
     await check("categoryId")
       .isNumeric()
       .withMessage("Category is required")
       .run(req);
     let result = validationResult(req);
     const autores = await getAutor();
     const categorys = await getCategorys();

    if (!result.isEmpty()) {
      return res.render("books/FormBooks", {
        page: "Autor",
        notify: { errors: result.array(), success: false },
        categorys,
        autores,
        csrfToken:req.csrfToken(),
      });
    }
    const { name, price, autorId, categoryId } = req.body;

    await newPool.query(
      `
            INSERT INTO books (name,price,autorId,categoryId) VALUES ($1,$2,$3,$4)
            `,
      [name, price, autorId, categoryId]
    );
    res.redirect('/books')
    
   } catch (error) {
    console.log(error);
    
   }
  };

  static formEditAutor = async (req, res) => {
    const { autorId } = req.params;

    const autor = await newPool.query(`SELECT * FROM autors WHERE id = $1`, [
      autorId,
    ]);
    res.render("autor/EditFormAutor", {
      page: "Autor",
      autor: autor.rows[0],
      csrfToken:req.csrfToken(),
    });
  };

  static formEditBook = async (req, res) => {
    const { bookId } = req.params;

    const autores = await getAutor();
    const categorys = await getCategorys();
    const book = await newPool.query(
      `
     SELECT * FROM books WHERE id = $1;
      `,
      [bookId]
    );

    res.render("books/EditFormBooks", {
      page: "Autor",
      book: book.rows[0],
      autores,
      categorys,
      message: "",
      csrfToken:req.csrfToken(),
    });
  };

  static editBook = async (req, res) => {
    const { bookId } = req.params;

    await check("name").notEmpty().withMessage("Name is required").run(req);
    await check("price").isNumeric().withMessage("Price is required").run(req);
    await check("autorId")
      .isNumeric()
      .withMessage("Autor is required")
      .run(req);
    await check("categoryId")
      .isNumeric()
      .withMessage("Category is required")
      .run(req);
    let result = validationResult(req);
    const autores = await getAutor();
    const categorys = await getCategorys();

    const book = await newPool.query(
      `
     SELECT * FROM books WHERE id = $1;
      `,
      [bookId]
    );

    if (!result.isEmpty()) {
      return res.render("books/EditFormBooks", {
        page: "Autor",
        notify: { errors: result.array(), success: false },
        categorys,
        autores,
        book: book.rows[0],
        csrfToken:req.csrfToken(),
      });
    }
    const { name, price, autorId, categoryId } = req.body;

    await newPool.query(
      `
      UPDATE books
        SET name=$1 , price = $2, autorid = $3 ,categoryid = $4
        WHERE id = $5
      `,
      [name, price, autorId, categoryId, bookId]
    );
    res.redirect("/books");
  };

  static deleteBook = async(req,res)=>{
    const {bookId} = req.params

   try {
    await deleteBook(bookId)
    res.redirect('/books')
   } catch (error) {
    console.log(error);
    
   }
    
  }
}