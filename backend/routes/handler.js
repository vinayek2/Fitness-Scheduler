

import express from 'express'; 
import cors from 'cors'; 
import pool from '../config/db.js'

const router = express.Router(); 

router.use(express.json()); 
router.use(cors()); 


///GET /students
router.get('/students', async (req, res) => {
    // pool.getConnection( (err, conn) => {
    //     if (err) throw err;

    //     try {
    //         const qry = `SELECT s.student_id, 
    //         s.first_name, s.last_name, s.dob, 
    //         s.email, s.phone, s.address, 
    //         s.program_id, s.enrollment_date
    //         FROM students s 
    //         INNER JOIN student_courses as sc ON sc.student_id=s.student_id`;
    //         conn.query(qry, (err, result) => {
    //             conn.release();
    //             if (err) throw err;
    //             res.send(JSON.stringify(result));
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.end();
    //     }
    // });

    try {
        const [rows] = await pool.query(`
            SELECT s.student_id, 
                   s.first_name, s.last_name, s.dob, 
                   s.email, s.phone, s.address, 
                   s.program_id, s.enrollment_date
            FROM students s 
            INNER JOIN student_courses sc ON sc.student_id = s.student_id
        `);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Database query error' });
    }
});

router.post('/addStudent', async (req, res) => {

   
    // const { student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date } = req.body;

    // pool.getConnection( (err, conn) => {
    //     if (err) throw err;
        
    //     const qry = `INSERT INTO students(student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date) 
    //     VALUES(?,?,?,?,?,?,?,?, NOW())`;
    //     conn.query(qry, [student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date], (err, result) => {
    //         conn.release();
    //         if (err) throw err;
    //         console.log('Student added!');
    //     });

    //     res.redirect('/students');
    //     res.end();
    // });

    const { student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO students (student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [student_id, first_name, last_name, dob, email, phone, address, program_id, enrollment_date]);

        console.log('Student added!', result);
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error('Error inserting student:', err);
        res.status(500).json({ error: 'Database insertion error' });
    }
});

export default router; 