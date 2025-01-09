// Load environment variables first
import 'dotenv/config'; 

import express from 'express'; 
import cors from 'cors'; 
import morgan from 'morgan'; // For logging
import routesHandler from './routes/handler.js'; 

const app = express(); 

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(morgan('combined')); // HTTP request logging
app.use('/', routesHandler); 

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//Version Two
// import 'dotenv/config'; 
// import pkg from 'body-parser'
// import express from 'express'; 
// const { urlencoded, json } = pkg; 
// import routesHandler from './routes/handler.js'; 

// const app = express(); 
// app.use(urlencoded({extended:false})); 
// app.use(json()); 
// app.use('/', routesHandler); 


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// }); 



//Version One 
// pool.getConnection((err, conn) =>{

//     if(err) throw err; 

//     const student_id = 124; 
//     const first_name = "Vinay"; 
//     const last_name = "Krishnan"; 
//     const dob = "2004-10-01"; 
//     const email = "vinayeashan@gmail.com"; 
//     const phone = "317-650-7519"; 
//     const address = "Fishers"; 
//     const program_id = 4; 

//     const qry = 'INSERT INTO students(student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW())'

//     conn.query(qry, [student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date], (err, result) => {
//         conn.release();
//         if(err) throw err; 
//         console.log(err); 
//     }); 

// }); 

// pool.getConnection((err, conn) => {
//     if (err) throw err;

//     const student_id = 124;
//     const first_name = "Vinay";
//     const last_name = "Krishnan";
//     const dob = "2004-10-01";
//     const email = "vinayeashan@gmail.com";
//     const phone = "317-650-7519";
//     const address = "Fishers";
//     const program_id = 4;

//     const qry = 'INSERT INTO students(student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW())';

//     // Remove enrollment_date from the parameter list
//     conn.query(qry, [student_id, first_name, last_name, dob, email, phone, address, program_id], (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log('Row inserted successfully:', result);
//     });
// });


