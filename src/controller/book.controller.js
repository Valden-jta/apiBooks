//?_________  Imports _________\\
const { pool } = require("../database.js");

//?_________ Datos _________\\
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

//TODO: devolver todos los libros almacenados en la DB de un usario
function getBooks(req,res) {}

//TODO: devolver datos del libro que coincidad con el id y el usuario especificados
function getBook(req,res) {}

//TODO: añadir un nuevo libro asociado a un usuario a la DB
function postBook(req,res) {}

//TODO: modificar un libro de la DB
function putBook(req,res) {}

//TODO: eliminar un libro de la DB
function deleteBook(req,res) {}

//?_________ Exports _________\\

module.exports = {
    getBooks,
    getBook,
    postBook,
    putBook,
    deleteBook
}