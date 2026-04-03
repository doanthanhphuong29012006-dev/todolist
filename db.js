import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

pool.connect((err, client, release) => {
    if (err) {
        console.err('Lỗi kết nối db: ', err.stack)
    } else  {
        console.log('DB ok rồi hehe')
    }

    if (client) release()
})

export default pool