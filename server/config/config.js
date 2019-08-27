// =================
//  Puerto
// =================
process.env.PORT = process.env.PORT || 3000;

// =================
//  Entorno
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================
//  Vencimiento del token
// =================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';

// =================
//  SEED de autentificación
// =================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =================
//  Base de datos
// =================
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafeton';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// =================
// Google Client ID
// =================
process.env.CLIENT_ID = process.env.CLIENT_ID || '679266346839-n5p3bf6bi0b2vv6p09b8mlqfsfhkd3ev.apps.googleusercontent.com';


// =================
// 
// =================

// =================
// 
// =================

// =================
// 
// =================