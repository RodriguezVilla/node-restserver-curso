// =================
//  Puerto
// =================
process.env.PORT = process.env.PORT || 3000;

// =================
//  Entorno
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================
//  Base de datos
// =================
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafeton';
} else {
    urlDB = 'mongodb+srv://strider:klGwyYsa9mxqT5qk@cluster0-kczwm.mongodb.net/cafeton';
}
process.env.URLDB = urlDB;