//?_________  Imports _________\\
const { pool } = require("../database.js");
const { User, hashPassword } = require("../models/user.js");

//?_________ Datos _________\\

let user;

//?_________ Funciones _________\\
/*

API VERBS   =   CRUD
------------------------
GET         =   SELECT
POST        =   INSERT
PUT         =   UPDATE
DELETE      =   DELETE
*/

// TODO: REGISTER -> Añadir nuevo usuario a la DB
const postUser = async (req, res) => {
  try {
    // Validación
    if (!req.body.name || !req.body.last_name || !req.body.email || !req.body.photo || !req.body.password) {
        return res.status(422).json({ error: "Todos los campos son obligatorios" });
    } 

    newUser = new User(
      req.body.id_user,
      req.body.name,
      req.body.last_name,
      req.body.email,
      req.body.photo,
      req.body.password
    );
    newUser.password = await hashPassword(newUser.name, newUser.password);
    console.log("Usuario a insertar: ", newUser);
    
    // Insertar user en la DB
    let sql = `INSERT INTO user (name, last_name, email, photo, password)
    VALUES (?,?,?,?,?)`;
    let param = [newUser.name, newUser.last_name, newUser.email, newUser.photo, newUser.password];

    let [result] = await pool.query(sql, param);
    console.log("Reusltado de la consulta: ", result);

    if (result.insertId)
        res.status(201).json({ message: "Usuario creado correctamente. Id de usuario: " + result.insertId });
    else 
        res.status(500).json({ message: "No se pudo crear el usuario" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: LOGIN -> Comprobar que existe un usuario (email y password) en la DB, retornar todos los datos menos la contraseña o notificar cambios incorrectos
function getUser(req, res) {}

// TODO: ACTUALIZAR -> actualiza la información del usuario en la DB
function putUser(req, res) {}

//?_________ Exports _________\\

module.exports = {
  getUser,
  postUser,
  putUser,
};
