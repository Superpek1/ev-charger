import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reginster.css';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCalendarAlt } from 'react-icons/fa';

const hashPassword = (password) => {
  return btoa(password);
};




function RegisterScreen() {
  const [idCard, setIdCard] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !confirmPassword) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน');
      return;
    }

    if (password !== confirmPassword) {
      setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    const usersJSON = localStorage.getItem('users');
    const existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

    if (existingUsers.some(user => user.username === username)) {
      setError('ชื่อผู้ใช้นี้มีคนใช้แล้ว');
      return;
    }

    const hashedPassword = hashPassword(password);

    const newUser = {
      username: username,
      password: hashedPassword,
      idCard, firstName, lastName, dob, phone
    };

    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบด้วยบัญชีที่สร้างใหม่');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h1 className="header-title">สมัครสมาชิก</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <form className="register-form" onSubmit={handleRegister}>

        {/* --- ข้อมูลสำหรับล็อกอิน (Input Groups) --- */}
        <label htmlFor="username" className="input-label">ชื่อผู้ใช้ (Username)</label>
        <div className="input-group">
          <input
            id="username"
            type="text"
            className="text-input"
            placeholder="ตั้งชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <label htmlFor="password" className="input-label">รหัสผ่าน</label>
        <div className="input-group">
          <input
            id="password"
            type="password"
            className="text-input"
            placeholder="ตั้งรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <label htmlFor="confirmPassword" className="input-label">ยืนยันรหัสผ่าน</label>
        <div className="input-group">
          <input
            id="confirmPassword"
            type="password"
            className="text-input"
            placeholder="ยืนยันรหัสผ่านอีกครั้ง"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* --- ข้อมูลส่วนตัว (Input Groups) --- */}
        <label htmlFor="idCard" className="input-label">เลขบัตรประจำตัวประชาชน</label>
        <div className="input-group">
          <input
            id="idCard"
            type="text"
            className="text-input"
            placeholder="เลขบัตรประจำตัวประชาชน"
            value={idCard}
            onChange={(e) => setIdCard(e.target.value)}
          />
        </div>

        <label htmlFor="firstName" className="input-label">ชื่อ</label>
        <div className="input-group">
          <input
            id="firstName"
            type="text"
            className="text-input"
            placeholder="ชื่อ"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <label htmlFor="lastName" className="input-label">นามสกุล</label>
        <div className="input-group">
          <input
            id="lastName"
            type="text"
            className="text-input"
            placeholder="นามสกุล"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <label htmlFor="dob" className="input-label">วัน/เดือน/ปีเกิด</label>
        <div className="input-group date-input">
          <input
            id="dob"
            type="text"
            className="text-input"
            placeholder="วัน/เดือน/ปีเกิด"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <FaCalendarAlt className="calendar-icon" />
        </div>

        <label htmlFor="phone" className="input-label">เบอร์โทรศัพท์</label>
        <div className="input-group">
          <input
            id="phone"
            type="tel"
            className="text-input"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <button type="submit" className="submit-button">สมัครสมาชิก</button>
      </form>
    </div>
  );
}

export default RegisterScreen;