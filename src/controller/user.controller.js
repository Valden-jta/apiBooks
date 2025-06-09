//?_________  Imports _________\\
const { pool } = require("../database.js");

//?_________ Datos _________\\
//Ej: let user = {
//  id_user: Number
// name: String,
// last_name: String,
// email: String,
//  photo: String,
//  password: String/ hash
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

// TODO: LOGIN -> Comprobar que existe un usuario (email y password) en la DB, retornar todos los datos menos la contraseña o notificar cambios incorrectos
function getUser(req,res) {}

// TODO: REGISTER -> Añadir nuevo usuario a la DB
function postUser(req,res) {}

// TODO: ACTUALIZAR -> actualiza la información del usuario en la DB 
function putUser(req,res) {}

//?_________ Exports _________\\

module.exports = {
  getUser,
  postUser,
  putUser
};
