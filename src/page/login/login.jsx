import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../../utils/AuthContext'; 



// ฟังก์ชันตรวจสอบรหัสผ่าน (ใช้ btoa: Base64 Encoding)
const comparePassword = (inputPassword, storedHash) => {
    try {
        const inputHash = btoa(inputPassword);
        return inputHash === storedHash;
    } catch (e) {
        return false; 
    }
};


function LoginScreen() {
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const GUEST_USERNAME = '1';
    const GUEST_PASSWORD = '1';

    const handleLogin = (e) => {
        e.preventDefault(); 
        setError('');


        if (username === GUEST_USERNAME && password === GUEST_PASSWORD) {
            login(GUEST_USERNAME);
            console.log('Login Successful! Redirecting to setting (Guest)');
            alert("Guest Login successful! (รหัสเริ่มต้น)");
            navigate('/setting'); 
            return; 
        }
        
        const usersJSON = localStorage.getItem('users');
        const existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

        const user = existingUsers.find(u => u.username === username);

        let isVerified = false;

        if (user) {
            isVerified = comparePassword(password, user.password);
        }

        if (isVerified) {
            login(user.username);
            
            console.log('Login Successful! Redirecting to /setting');
            
            navigate('/setting'); 
        

        } else {
            console.log('Login Failed: Invalid credentials');
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
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

                <button type="submit" className="login-button">
                    LOGIN
                </button>
            </form>

            <div className="bottom-links">
                <a href="#" className="forgot-password-link" onClick={() => console.log('Forgot password clicked')}>
                    ลืมรหัสผ่าน?
                </a>

                <a href="#" className="register-link" onClick={() => navigate('/register')}>
                    สมัครสมาชิก
                </a>
            </div>
        </div>
    );
}

export default LoginScreen;