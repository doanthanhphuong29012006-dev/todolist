import express from 'express'
import sessions from '../sessionStore.js'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const session = sessions[req.cookies.sessionId]

  if (!session) {
    return res.redirect('/login')
  }

  try {
    const userId = session.user
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    const user = result.rows[0]

    if (!user) {
      return res.redirect('/login')
    }

    const allTodos = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC', [userId])
    res.render('tasks', {
      todos: allTodos.rows,
      user: user
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi Server')
  }
})

router.post('/', async (req, res) => {
  const session = sessions[req.cookies.sessionId];
  if (!session) {
    return res.redirect('/login');
  }

  try {
    const { title } = req.body
    const userId = session.user
    const newTodo = await pool.query(
      'INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, userId]
    )

    res.redirect('/todos')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi Server')
  }
})

router.post('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params

    await pool.query('UPDATE todos SET completed = NOT completed WHERE id = $1', [id])

    res.redirect('/todos')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi Server')
  }
})

router.post('/:id/delete', async (req, res) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM todos WHERE id = $1', [id])

    res.redirect('/todos')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Lỗi Sever')
  }
})

export default router