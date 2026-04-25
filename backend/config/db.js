import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Kết nối thành công tới PostgreSQL Database!');
});

pool.on('error', (err) => {
    console.error('Lỗi kết nối tới PostgreSQL Database:', err);
});

export default pool;
