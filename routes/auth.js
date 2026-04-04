import express from 'express'
import pool from '../db.js'
import sessions from '../sessionStore.js'

const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        const user = result.rows[0]

        if (user && user.password === password) {
            const sessionId = Date.now().toString()
            sessions[sessionId] = { user: user.id }

            res.setHeader('Set-Cookie', `sessionId=${sessionId}; max-age=3600; httpOnly`).redirect('/login')
            return
        }
        res.render('login', { error: 'Tài khoản hoặc mật khẩu không hợp lệ'})
    } catch (err) {
        res.status(500).send('Lỗi Server')
    }
})

router.get('/logout', (req, res) => {
    delete sessions[req.cookies.sessionId]
    res.setHeader('Set-Cookie', `sessionId=; max-age=0`).redirect('/login')
})

export default router