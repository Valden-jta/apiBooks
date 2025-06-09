//?_________  Imports _________\\
const bcrypt = require("bcrypt");

class User {
  constructor(id_user, name, last_name, email, photo, password) {
    this.id_user = id_user;
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.photo = photo;
    this.password = password;
  }
}

// encriptacion de contraseña con bcrypt
async function hashPassword(name, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("Contraseña encriptada: " + JSON.stringify({ name, password, hash }));
    return hash;
  } catch (err) {
    throw new Error("Hubo un error al encriptar la contraseña: " + err.message);
  }
}


module.exports = { User, hashPassword };
