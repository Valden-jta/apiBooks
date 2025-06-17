//?_________  Imports _________\\
const { pool } = require("../database.js");
const { Book } = require("../models/book.js");

//?_________ Datos _________\\
let book;
let books = [];

//Ej: let user = {
// id_book: Number
// id_user: Number
// title: String,
// type: String,
// author: String,
// price: Number,
// photo: String
// }

//?_________ Funciones _________\\
/*

API VERBS   =   CRUD
------------------------
GET         =   SELECT
POST        =   INSERT
PUT         =   UPDATE
DELETE      =   DELETE
*/

// * ------------ GETBOOKS ->

const getBooks = async (req, res) => {
  try {
    let id_user = req.query.id_user;
    let id_book = req.query.id_book;
    let sql;
    let param = [];

    //Comprobar si se recibe id_user
    if (!id_user) {
      return res.status(400).json({
        error: true,
        code: 404,
        message: "Petición mal formulada. Se debe incluir el ID de usuario",
      });
    }

    // Comprobar si el usuario existe
    sql = "SELECT COUNT(*) AS total FROM user WHERE id_user = ?";
    const [userSearch] = await pool.query(sql, [id_user]);
    if (userSearch[0].total === 0) {
      // No existe el usuario
      return res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese id",
      });
    }
    // * 1. Devolver todos los libros almacenados en la DB de un usario
    if (!id_book) {
      sql = "SELECT * FROM book WHERE id_user = ?";
      const [getAll] = await pool.query(sql, [id_user]);
      return res.status(200).json({
        error: false,
        code: 200,
        message:
          getAll.length === 0
            ? "El usuario no tiene libros"
            : `${getAll.length} Libros recuperados para el usuario`,
        data: getAll,
      });
    }

    // * 2. Devolver datos del libro que coincida con el id_book y elid_user especificados
    sql = "SELECT * FROM book WHERE id_user = ? AND id_book = ?";
    param = [id_user, id_book];
    const [getOne] = await pool.query(sql, param);
    return res.status(200).json({
      error: false,
      code: 200,
      message:
        getOne.length === 0
          ? "El usuario no tiene ese libro"
          : "Libro recuperado con exito",
      data: getOne,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

// * ------------ POSTBOOK -> añadir un nuevo libro asociado a un usuario a la DB
const postBook = async (req, res) => {
  try {
    let newbook = new Book(
      req.body.id_book,
      req.body.id_user,
      req.body.title,
      req.body.type,
      req.body.author,
      req.body.price,
      req.body.photo
    );
    let sql;
    let param = [];
  } catch (error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

//TODO: modificar un libro de la DB
const putBook = async (req, res) => {};

//TODO: eliminar un libro de la DB
const deleteBook = async (req, res) => {};

//?_________ Exports _________\\

module.exports = {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
};
