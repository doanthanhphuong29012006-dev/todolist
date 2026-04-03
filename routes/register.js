import express from 'express'
import pool from '../db.js'
import sessions from '../sessionStore.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async(req, res) => {
    const { username, password } = req.body

    try {
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password])
    } catch(err) {
        res.render('register', { error: 'Tên đăng nhập đã tồn tại hoặc đã xảy ra lỗi' })
    }
})

export default router