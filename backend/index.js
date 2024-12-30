const pool = require('./config/db.js')
require('dotenv/config'); 


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

pool.getConnection((err, conn) => {
    if (err) throw err;

    const student_id = 124;
    const first_name = "Vinay";
    const last_name = "Krishnan";
    const dob = "2004-10-01";
    const email = "vinayeashan@gmail.com";
    const phone = "317-650-7519";
    const address = "Fishers";
    const program_id = 4;

    const qry = 'INSERT INTO students(student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW())';

    // Remove enrollment_date from the parameter list
    conn.query(qry, [student_id, first_name, last_name, dob, email, phone, address, program_id], (err, result) => {
        conn.release();
        if (err) throw err;
        console.log('Row inserted successfully:', result);
    });
});
