import pool from '../../../config/db.js';
import * as todoService from '../services/todo.service.js';

export async function getTodos (req, res) {
    try {
        const userId = req.user.userId;
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'Không tìm thấy người dùng' 
            });
        }

        const todos = await todoService.getTodoUserById(userId);

        res.status(200).json({
            success: true,
            data: todos,
            user: { user: user.username }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi Server' 
        });
    }
}

export async function createNewTodo (req, res) {
    try {
        const { title } = req.body;
        const userId = req.user.userId;

        await todoService.createTodo(title, userId);
        res.status(201).json({ 
            success: true, 
            message: 'Thêm công việc thành công' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi Server' 
        });
    }
};

export async function updateNewTodo (req, res) {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const userId = req.user.userId;

        await todoService.updateTodo(id, title, userId);
        res.status(200).json({ 
            success: true, 
            message: 'Cập nhật thành công' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi Server' 
        });
    }
};

export async function deleteTodoById (req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        await todoService.deleteTodo(id, userId);
        res.status(200).json({ 
            success: true, 
            message: 'Xóa thành công' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi Server' 
        });
    }
};

export async function toggleTodoById (req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        await todoService.toggleTodo(id, userId);
        res.status(200).json({ 
            success: true, 
            message: 'Thay đổi trạng thái thành công' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi Server' 
        });
    }
};
