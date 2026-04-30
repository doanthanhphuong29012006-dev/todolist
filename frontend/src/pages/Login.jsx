import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await api.post('/login', { username, password });
            navigate('/todos');
        } catch (err) {
            setError(err.response?.data?.error || 'Tài khoản hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Đăng nhập</h2>
                {error && <p className="error-msg">{error}</p>}
                
                <form onSubmit={handleLogin} className="auth-form">
                    <input 
                        type="text" 
                        placeholder="Tên đăng nhập" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="auth-input"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Mật khẩu" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        required
                    />
                    <button type="submit" className="btn-primary">Đăng nhập</button>
                </form>
                <p className="auth-links">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
            </div>
        </div>
    );
};

export default Login;