import mysql from 'mysql2/promise'; 




/*
you could do createConnection but alot of people don't know when to end the connection and run into
errors so just use a pool for future reference in projects.
*/
const pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_DATABASE 
}); 


export default pool; 