# apiBooks
api REST to access and manage books and user information from appBooks

## 1. setUp

Puesta en marcha inicial del proyecto (inicialización, importacion de módulos)

## 2. user

### 2.1 register

Endpoint register para registrar usuario nuevo. Contraseña se almacena en forma de hash en la DB.

### 2.2 login

Endpoint login: 
- valida que se reciba email y contraseña.
- Si existe el email en la base de datos utiliza `bcrypt.compare()` para comprobar que la contraseña es correcta
