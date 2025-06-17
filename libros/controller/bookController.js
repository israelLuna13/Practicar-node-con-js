import { check,validationResult } from "express-validator";
import { newPool } from "../config/db.js";

export class BookController {

  static home = async(req, res) => {
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
      books
    });
  };

  static formCategory = (req, res) => {
    res.render("category/FormCategory", {
      page: "Category",
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
        });
      }
      const { name } = req.body;
      await newPool.query(
        `
            INSERT INTO categorys (name) VALUES ($1)
            `,
        [name]
      );
      res.render("category/FormCategory", {
        notify: { errors: false, success: true },
      });
    } catch (error) {
      console.log(error);
      console.log("There was a error");
    }
  };

  static formAutor = async(req, res) => {
    // const autor = await newPool.query(`
    //   SELECT * FROM autors;
    //   `)
    res.render("autor/FormAutor", {
      page: "Autor"
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
      });
    }
    const { name, country } = req.body;

    await newPool.query(
      `
            INSERT INTO autors (name,country) VALUES ($1,$2)
            `,
      [name, country]
    );
    res.render("autor/FormAutor", {
      notify: { errors: false, success: true },
    });
  };

   static formBook = async(req, res) => {
     const autores= await newPool.query(`
        SELECT * FROM autors;
        `)
        const categorys= await newPool.query(`
        SELECT * FROM categorys;
        `)
    res.render('books/FormBooks',{
        page:'books',
        autores,
        categorys
    })
  };

  static createBook = async (req, res) => {
    await check("name").notEmpty().withMessage("Name is required").run(req);
    await check("price")
      .isNumeric()
      .withMessage("Price is required")
      .run(req);
    await check('autorId')
        .isNumeric()
      .withMessage("Autor is required")
      .run(req);
    await check('categoryId')
        .isNumeric()
      .withMessage("Category is required")
      .run(req);
    let result = validationResult(req);
 const autores= await newPool.query(`
        SELECT * FROM autors;
        `)
        const categorys= await newPool.query(`
        SELECT * FROM categorys;
        `)

    if (!result.isEmpty()) {

      return res.render("books/FormBooks", {
        page: "Autor",
        notify: { errors: result.array(), success: false },
        categorys,
        autores
      });
    }    
     const { name, price,autorId,categoryId } = req.body;

     console.log(req.body);
     

    await newPool.query(
      `
            INSERT INTO books (name,price,autorId,categoryId) VALUES ($1,$2,$3,$4)
            `,
      [name, price,autorId,categoryId]
    );
    res.render("books/FormBooks", {
      notify: { errors: false, success: true },
       categorys,
        autores
    });
  };

    static formEditAutor = async(req, res) => {
      const {autorId}=req.params
      
   const autor = await newPool.query(
  `SELECT * FROM autors WHERE id = $1`,
  [autorId]
);      
    res.render("autor/EditFormAutor", {
      page: "Autor",
      autor:autor.rows[0]
        });
  };

    static formEditBook = async(req, res) => {
      const {bookId}=req.params

       const autores= await newPool.query(`
        SELECT * FROM autors;
        `)
        const categorys= await newPool.query(`
        SELECT * FROM categorys;
        `)
       const book = await newPool.query(`
     SELECT * FROM books WHERE id = $1;
      `,[bookId]);          
      console.log(book);
      
    res.render("books/EditFormBooks", {
      page: "Autor",
      book:book.rows[0],
      autores,
      categorys
        });
  };


  

}