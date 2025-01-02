const express = require('express');
const router = express.Router();
const pool =  require('../config/db.js');

router.get('/students', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT s.student_id, 
            s.first_name, s.last_name, s.dob, 
            s.email, s.phone, s.address, 
            s.program_id, s.enrollment_date
            FROM students s 
            INNER JOIN student_courses as sc ON sc.student_id=s.student_id`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});

router.post('/addStudent', async (req, res) => {

    student_id = req.body.input;
    first_name = req.body.input;
    last_name = req.body.input;
    dob = req.body.input;
    email = req.body.input;
    phone = req.body.input;
    address = req.body.input;
    program_id = req.body.input;
    enrollment_date = req.body.input;
    

    pool.getConnection( (err, conn) => {
        if (err) throw err;
        
        const qry = `INSERT INTO students(student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date) 
        VALUES(?,?,?,?,?,?,?,?, NOW())`;
        conn.query(qry, [student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date], (err, result) => {
            conn.release();
            if (err) throw err;
            console.log('Student added!');
        });

        res.redirect('/students');
        res.end();
    });
});

module.exports = router;