import pool from '../../../config/db.js';
import bcrypt from 'bcryptjs';

export async function registerUser({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', 
        [username, hashedPassword]
    );
    return result.rows[0];
}