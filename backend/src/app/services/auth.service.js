import pool from '../../../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function checkValidLogin({ username, password }) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user) {
        const verify = await bcrypt.compare(password, user.password);

        if (verify) {
            return user;
        }
        return null;
    }
}

export function authToken(user) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}
