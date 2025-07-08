//Importamos el modulo mysql en modo promise para poder usar async/await
import mysql from 'mysql2/promise';
import environments from '../config/environments.js';

const {db} = environments;

const connection = mysql.createPool({
    host: db.host,
    database: db.name,
    user: db.user,
    password: db.password,
});


export default connection;