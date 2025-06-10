# apiBooks

API REST para acceder y gestionar información de libros y usuarios desde la aplicación **appBooks**.

En este mismo repositorio hay una base de datos de muestra que puedes instalar en tu equipo (no te olvides de introducir tus credenciales en el fichero database.js):
```js
.createPool({
    // Parámetros de conexion del usuario
    host: "",
    user: "",
    password: "",
    database: "",
    // Parámetros de configuración de las opciones de conexion
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit: 0,
  })
```

---

## 1. SetUp

Puesta en marcha inicial del proyecto:
- Inicialización del entorno.
- Importación de módulos necesarios.

---

## 2. User endpoints

### 2.1 Registro de usuario

**Endpoint:** `/register`

- Permite registrar un usuario nuevo.
- La contraseña se almacena en la base de datos en forma de hash usando `bcrypt`.

---

### 2.2 Login

**Endpoint:** `/login`

- Valida que se reciban el email y la contraseña.
- Si el email existe en la base de datos, utiliza `bcrypt.compare()` para comprobar que la contraseña es correcta.

---

### 2.3 Actualización de usuario

**Endpoint:** `/usuarios`

- Permite actualizar los datos del usuario y la contraseña de forma independiente.
- Es obligatorio introducir la contraseña actual para hacer efectivos los cambios.

---