import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todolist_db',
    password: '123456',
    port: 5432,
});


export default pool;