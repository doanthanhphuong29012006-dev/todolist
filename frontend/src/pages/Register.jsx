import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', { username, password });
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Tên đăng nhập đã tồn tại hoặc lỗi server');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Đăng ký tài khoản</h2>
                {error && <p className="error-msg">{error}</p>}
                
                <form onSubmit={handleRegister} className="auth-form">
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
                    <button type="submit" className="btn-primary">Đăng ký</button>
                </form>
                <p className="auth-links">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </div>
        </div>
    );
};

export default Register;