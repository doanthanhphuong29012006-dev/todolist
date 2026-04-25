import pool from '../../../config/db.js';

export async function getTodoUserById (userId) {
    const result = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC', [userId]);
    return result.rows;
}

export async function createTodo (title, userId) {
    const result = await pool.query('INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *', [title, userId]);
    return result.rows[0];
}

export async function toggleTodo (id, userId) {
    await pool.query('UPDATE todos SET completed = NOT completed WHERE id = $1 AND user_id = $2', [id, userId]);
}

export async function deleteTodo (id, userId) {
    await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2', [id, userId]);
};

export async function updateTodo (id, title, userId) {
    await pool.query('UPDATE todos SET title = $1 WHERE id = $2 AND user_id = $3', [title, id, userId]);
};