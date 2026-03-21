import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FiMail, FiLock } from 'react-icons/fi'; // เปลี่ยนไอคอนเป็นรูปจดหมาย
import { useAuth } from '../../utils/AuthContext';
import api from '../../api/axios';

function LoginScreen() {
    const navigate = useNavigate();
    const { login } = useAuth();

    // เปลี่ยน state จาก username เป็น email
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await api.post('/users/login', { 
                identifier: email,  
                userPassword: password 
            });
            
            const { token, role, message } = response.data;
            alert(message); 
            
            login({ userEmail: email, role }, token); 
            
            navigate('/setting');
            
        } catch (err) {
            setError(err.response?.data?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="input-area" onSubmit={handleLogin}>
                <div className="input-group">
                    <FiMail className="input-icon" />
                    <input
                        type="text" 
                        className="login-input"
                        placeholder="username หรืออีเมล (E-mail)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                {error && <p className="error-message" style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}

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