import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const fetchTodos = useCallback(async () => {
        try {
            const response = await api.get('/todos');
            setTodos(response.data.todos || response.data.data || []);
            setUser(response.data.user?.username || 'Guest');
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 302) {
                navigate('/login');
            }
        }
    }, [navigate]);

    useEffect(() => {
        // eslint-disable-next-line
        fetchTodos();
    }, [fetchTodos]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        try {
            await api.post('/todos', { title: newTitle });
            setNewTitle('');
            fetchTodos();
        } catch (err) {
            console.error('Lỗi khi thêm:', err);
        }
    };

    const handleToggle = async (id) => {
        try {
            await api.post(`/todos/${id}/toggle`);
            fetchTodos();
        } catch (err) {
            console.error('Lỗi khi cập nhật:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.post(`/todos/${id}/delete`);
            fetchTodos();
        } catch (err) {
            console.error('Lỗi khi xóa:', err);
        }
    };

    const handleLogout = async () => {
        try {
            await api.get('/logout');
            navigate('/login');
        } catch (err) {
            console.error('Lỗi đăng xuất', err);
        }
    };

    return (
        <div className="app-layout">
            <nav className="navbar">
                <div className="nav-brand">Todo App</div>
                <div className="nav-user-area">
                    <span className="user-greeting">Xin chào, <strong>{user}</strong></span>
                    <button className="btn-logout" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                    </button>
                </div>
            </nav>

            <main className="todos-container">
                <h2 className="todos-title">Danh sách công việc cần làm</h2>

                <form onSubmit={handleAddTodo} className="todo-form">
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        placeholder="Thêm việc bạn muốn làm..."
                        className="todo-input"
                    />
                    <button type="submit" className="btn-add">Thêm</button>
                </form>

                <div className="todo-list-wrapper">
                    {todos.length === 0 ? (
                         <p className="empty-state">Bạn chưa có công việc nào. Bắt đầu thêm ngay!</p>
                    ) : (
                        <ul className="todo-list">
                            {todos.map(todo => (
                                <li key={todo.id} className="todo-item">
                                    <label className="checkbox-container">
                                        <input 
                                            type="checkbox" 
                                            checked={todo.completed} 
                                            onChange={() => handleToggle(todo.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    
                                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                        {todo.title}
                                    </span>
                                    
                                    <button className="btn-delete" onClick={() => handleDelete(todo.id)}>
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Todos;