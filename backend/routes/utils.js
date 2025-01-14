// utils.js
import pool from '../config/db.js';

export async function validateUser(student_id, email) {
    const qry = `
        SELECT student_id, email 
        FROM students 
        WHERE student_id = ? AND email = ?
    `;
    const params = [student_id, email];

    try {
        const [rows] = await pool.query(qry, params);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error validating user:', err);
        throw err;
    }
}
