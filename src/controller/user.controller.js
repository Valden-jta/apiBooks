//?_________  Imports _________\\
const { pool } = require("../database.js");
const {
  User,
  userInfo,
  hashPassword,
  comparePassword,
} = require("../models/user.js");

//?_________ Datos _________\\

//?_________ Funciones _________\\
/*
API VERBS   =   CRUD
------------------------
GET         =   SELECT
POST        =   INSERT
PUT         =   UPDATE
DELETE      =   DELETE
*/

// * ------------ REGISTER -> Añadir nuevo usuario a la DB
const postUser = async (req, res) => {
  try {
    // Validación
    if (
      !req.body.name ||
      !req.body.last_name ||
      !req.body.email ||
      !req.body.photo ||
      !req.body.password
    ) {
      return res
        .status(422)
        .json({ error: "Todos los campos son obligatorios" });
    }

    newUser = new User(
      req.body.id_user,
      req.body.name,
      req.body.last_name,
      req.body.email,
      req.body.photo,
      req.body.password
    );

    // Comprobar si el mail existe en la base de datos
    let sql = `SELECT email FROM user WHERE email = ?`;
    let param = [req.body.email];
    let [emailCheck] = await pool.query(sql, param);

    if (emailCheck.length) {
      return res.status(409).json({
        error: true,
        code: 409,
        message: "El email ya está registrado",
      });
    }
    newUser.password = await hashPassword(newUser.name, newUser.password);
    console.log("Usuario a insertar: ", newUser);

    // Insertar user en la DB
    sql = `INSERT INTO user (name, last_name, email, photo, password)
    VALUES (?,?,?,?,?)`;
    param = [
      newUser.name,
      newUser.last_name,
      newUser.email,
      newUser.photo,
      newUser.password,
    ];

    let [result] = await pool.query(sql, param);
    console.log("Reusltado de la consulta: ", result);

    if (result.insertId)
      res.status(201).json({
        error: false,
        code: 201,
        message:
          "Usuario creado correctamente. Id de usuario: " + result.insertId,
      });
    else
      res.status(500).json({
        error: true,
        code: 500,
        message: "No se pudo crear el usuario",
      });
  } catch (error) {
    res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

//  * ------------ LOGIN -> Comprobar que existe un usuario (email y password) en la DB, retornar todos los datos menos la contraseña o notificar cambios incorrectos
const getUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(422).json({
        error: true,
        code: 422,
        message: "Todos los campos son obligatorios",
      });
    }

    let sql = `SELECT * FROM user where email = ?`;
    let param = [req.body.email];

    let [result] = await pool.query(sql, param);
    if (!result.length) {
      res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese email",
      });
    } else {
      let passwordCheck = await comparePassword(
        req.body.password,
        result[0].password
      );
      if (passwordCheck) {
        let userData = userInfo(result[0]);
        res.status(200).json({
          error: false,
          code: 200,
          message: "Login correcto",
          data: userData,
        });
      } else {
        res.status(404).json({
          error: true,
          code: 404,
          message: "La contraseña es incorrecta",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

// * ------------ ACTUALIZAR -> actualiza la información del usuario en la DB
const putUser = async (req, res) => {
  try {
    // En el front de profile no se ve, pero el id estará almecenado los datos de usuario
    let updatedUser = {
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      photo: req.body.photo,
    };
    let newPassword = req.body.newPassword;
    let password = req.body.password;

    // Validacion de las credenciales
    let sql = `SELECT password FROM user WHERE id_user = ?`;
    let param = [req.body.id_user];

    let [userSearch] = await pool.query(sql, param);
    // Autenticar contraseña actual
    if (userSearch.length) {
      let passwordCheck = await comparePassword(
        password,
        userSearch[0].password
      );
      if (!passwordCheck) {
        return res.status(401).json({
          error: true,
          code: 401,
          message: "la contraseña es incorrecta",
        });
      }

      // Encriptar contraseña nueva y añadrila a updatedUser
      if (newPassword) {
        let hashedPassword = await hashPassword(newPassword);
        updatedUser.password = hashedPassword;
        console.log("Contraseña actualizada");
      }
    } else {
      return res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese Id",
      });
    }

    // Preparar la consulta de forma dinámica
    let preparedStmt = {
      sql: [],
      param: [],
    };

    for (let attr in updatedUser) {
      if (updatedUser[attr]) {
        preparedStmt.sql.push(`${attr} = ?`);
        preparedStmt.param.push(updatedUser[attr]);
      }
    }

    if (!preparedStmt.sql.length) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: "No hay campos para actualizar",
      });
    }

    sql = `UPDATE user SET ${preparedStmt.sql.join(", ")}
    WHERE id_user = ?;`;
    preparedStmt.param.push(req.body.id_user);
    param = preparedStmt.param;

    let [result] = await pool.query(sql, param);
    if (result.affectedRows > 0) {
      res.status(200).json({
        error: false,
        code: 200,
        message:
          "Datos de usuario modificados correctamente. Registros modificados: " +
          result.affectedRows,
        data: result,
      });
      console.log("datos actualizados correctamente");
    } else {
      return res.status(404).json({
        error: true,
        code: 404,
        message: "No existe ningún usuario con ese id",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      code: 500,
      message: error.message,
    });
  }
};

//?_________ Exports _________\\

module.exports = {
  getUser,
  postUser,
  putUser,
};
