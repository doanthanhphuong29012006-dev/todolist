import pool from '../../../config/db.js';
import * as todoService from '../services/todo.service.js';

export async function renderTodos (req, res) {
    try {
        const userId = req.user.userId;
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = userResult.rows[0];

        if (!user) {
            return res.redirect('/login');
        }

        const todos = await todoService.getTodoUserById(userId);

        res.render('tasks', {
            todos: todos,
            user: user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
}

export async function createNewTodo (req, res) {
    try {
        const { title } = req.body;
        const userId = req.user.userId;

        await todoService.createTodo(title, userId);
        res.redirect('/todos');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
};

export async function updateNewTodo (req, res) {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const userId = req.user.userId;

        await todoService.updateTodo(id, title, userId);
        res.redirect('/todos');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
};

export async function deleteTodoById (req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        await todoService.deleteTodo(id, userId);
        res.redirect('/todos');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
};

export async function toggleTodoById (req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        await todoService.toggleTodo(id, userId);
        res.redirect('/todos');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
};
