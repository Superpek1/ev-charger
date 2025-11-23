import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FiUser, FiLock } from 'react-icons/fi';
import { verifyUser } from "../../data/Pass"; 
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    
    e.preventDefault(); 
    setError('');


    const usersJSON = localStorage.getItem('users');
    const existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

    const user = existingUsers.find(u => u.username === username);

    let isVerified = false;

    if (user) {
      isVerified = comparePassword(password, user.password);
    }

    if (isVerified) {
      localStorage.setItem('currentUser', user.username);

      console.log('Login Successful! Redirecting to /setting');
      navigate('/setting');

    } else {
      console.log('Login Failed: Invalid credentials');
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="login-container">

      <div className="input-area">

        <div className="input-group">
          <FiUser className="input-icon" />
          <input
            type="text"
            className="login-input"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>
      </div>

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