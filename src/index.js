const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

//Aqui requiero los paquetes para trabajar lo referido a session y cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Para indicarle express la carpeta donde se encuentran los archivos estáticos
app.use(express.static(path.resolve(__dirname, '..', 'public')));

//Debemos indicar cual es el motor de plantillas que estamos usando EJS
app.set('view engine','ejs');
// Define la ubicación de la carpeta de las Vistas
app.set('views', path.join(__dirname, '../src/views'));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

//Requerir las rutas
const webRoutes = require('./routes/web.routes');
const userRoutes = require('./routes/user.routes');
const productoRoutes = require('./routes/producto.routes');
const adminRoutes = require('./routes/admin.routes');

//Para usar las rutas
app.use(webRoutes);
app.use(productoRoutes);
app.use(userRoutes);
app.use(adminRoutes);
 
//Levantar servidor
app.listen(3001, 'localhost', ()=> console.log('http://localhost:3001'));
