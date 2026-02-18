import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../../utils/AuthContext';
import api from '../../api/axios';

function LoginScreen() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                username,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            login(user.username);

            navigate('/setting');

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="input-area" onSubmit={handleLogin}>
                <div className="input-group">
                    <FiUser className="input-icon" />
                    <input
                        type="text"
                        className="login-input"
                        placeholder="ชื่อผู้ใช้"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiLock className="input-icon" />
                    <input
                        type="password"
                        className="login-input"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'กำลังเข้าสู่ระบบ...' : 'LOGIN'}
                </button>
            </form>

            <div className="bottom-links">
                <a href="#" className="forgot-password-link">ลืมรหัสผ่าน?</a>
                <a href="#" className="register-link" onClick={() => navigate('/register')}>
                    สมัครสมาชิก
                </a>
            </div>
        </div>
    );
}

export default LoginScreen;