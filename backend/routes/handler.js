

import express from 'express'; 
import cors from 'cors'; 
import pool from '../config/db.js'
import jwt from 'jsonwebtoken';
import { validateUser } from '../routes/utils.js';
const router = express.Router(); 

router.use(express.json()); 
router.use(cors()); 


router.get('/students', async (req, res) => {
    const { student_id, email } = req.query; // Extract both student_id and email
    let qry = `
        SELECT s.student_id, 
               s.first_name, s.last_name, s.dob, 
               s.email, s.phone, s.address, 
               s.program_id, s.enrollment_date
        FROM students s 
        LEFT JOIN student_courses sc ON sc.student_id = s.student_id
    `;

    const params = [];
    if (student_id && email) {
        qry += ` WHERE s.student_id = ? AND s.email = ?`;
        params.push(student_id, email);
    } else if (student_id) {
        qry += ` WHERE s.student_id = ?`;
        params.push(student_id);
    }

    try {
        const [rows] = await pool.query(qry, params);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Database query error' });
    }
});


// const jwt = require('jsonwebtoken');
router.post('/signin', async(req, res)=>{
    const {student_id, email} = req.body; 

    const user = await validateUser(student_id, email) ; 

    if(user){
        const token = jwt.sign({student_id: user.student_id}, 'your_secret_key'); 
        res.json({token}); 

    } else{
        res.status(401).json({message: 'Invalid Credentials'}); 
    }
});




router.get('/fetchClass', async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_secret_key'); 
    const studentId = decoded.student_id; 

    let qry = `
        SELECT * 
        FROM students.student_courses sc
        WHERE sc.student_id = $1; 
    `;
    const client = await pool.connect(); 
    try {
        const result = await client.query(qry, [studentId]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({ error: err.message })
    }finally{
        client.release(); 
    }

});
    

router.post('/addStudent', async (req, res) => {


    const { first_name, last_name, dob, email, phone, address, program_id, enrollment_date } = req.body;

    try {

        const [existingStudents] = await pool.query('SELECT * FROM students WHERE email = ?', [email]); 
        if (existingStudents.length > 0) {  
            return res.status(400).json({ message: 'Email already in use' }); 
        }
       
        const [result] = await pool.query(`
            INSERT INTO students (first_name, last_name, dob, email, phone, address, program_id, enrollment_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [first_name, last_name, dob, email, phone, address, program_id, enrollment_date]);
        
        const newStudentId = result.insertId;
        console.log('Student added!', result);
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error('Error inserting student:', err);
        res.status(500).json({ error: 'Database insertion error' });
    }
});

export default router; 