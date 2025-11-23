import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../utils/AuthContext';

const hashPassword = (password) => {
    return btoa(password);
};

const comparePassword = (inputPassword, storedHash) => {
    try {
        const inputHash = btoa(inputPassword);
        return inputHash === storedHash;
    } catch (e) {
        return false;
    }
};


function ChangePasswordScreen() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const togglePasswordVisibility = (setter, currentState) => {
        setter(!currentState);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!currentUser) {
            setError('คุณไม่ได้ล็อกอิน กรุณาล็อกอินใหม่');
            logout();
            navigate('/login');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน');
            return;
        }

        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

        const userIndex = existingUsers.findIndex(u => u.username === currentUser);

        if (userIndex === -1) {
            setError('ไม่พบข้อมูลผู้ใช้ในระบบ');
            logout();
            return;
        }

        const user = existingUsers[userIndex];

        const isOldPasswordCorrect = comparePassword(oldPassword, user.password);

        if (!isOldPasswordCorrect) {
            setError('รหัสผ่านเก่าไม่ถูกต้อง');
            return;
        }

        const newHashedPassword = hashPassword(newPassword);

        existingUsers[userIndex] = {
            ...user,
            password: newHashedPassword
        };

        localStorage.setItem('users', JSON.stringify(existingUsers));

        setSuccessMessage('เปลี่ยนรหัสผ่านสำเร็จแล้ว! คุณจะถูกนำไปหน้า Setting');

        setTimeout(() => {
            navigate('/setting');
        }, 2000);
    };

    return (
        <div className="register-container">
            <header className="register-header">
                <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
                <h1 className="header-title">เปลี่ยนรหัสผ่าน</h1>
                <div style={{ width: '24px' }}></div>
            </header>

            <form className="register-form" onSubmit={handleChangePassword}>

                {successMessage && <p style={{ color: 'green', marginBottom: '15px' }}>{successMessage}</p>}

                <label htmlFor="oldPassword" className="input-label">รหัสผ่านเก่า</label>
                <div className="input-group password-toggle-group">
                    <FiLock className="input-icon" />
                    <input
                        id="oldPassword"
                        type={showOldPass ? 'text' : 'password'}
                        className="text-input"
                        placeholder="กรอกรหัสผ่านเก่า"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    {/* ปุ่มสลับการแสดงผล */}
                    <span
                        className="toggle-password-icon"
                        onClick={() => togglePasswordVisibility(setShowOldPass, showOldPass)}
                    >
                        {showOldPass ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>

                {/* --- ช่องรหัสผ่านใหม่ --- */}
                <label htmlFor="newPassword" className="input-label">รหัสผ่านใหม่</label>
                <div className="input-group password-toggle-group">
                    <FiLock className="input-icon" />
                    <input
                        id="newPassword"
                        type={showNewPass ? 'text' : 'password'}
                        className="text-input"
                        placeholder="กรอกรหัสผ่านใหม่"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password-icon"
                        onClick={() => togglePasswordVisibility(setShowNewPass, showNewPass)}
                    >
                        {showNewPass ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>

                {/* --- ช่องยืนยันรหัสผ่านใหม่ --- */}
                <label htmlFor="confirmNewPassword" className="input-label">ยืนยันรหัสผ่านใหม่</label>
                <div className="input-group password-toggle-group">
                    <FiLock className="input-icon" />
                    <input
                        id="confirmNewPassword"
                        type={showConfirmPass ? 'text' : 'password'}
                        className="text-input"
                        placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password-icon"
                        onClick={() => togglePasswordVisibility(setShowConfirmPass, showConfirmPass)}
                    >
                        {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                <button type="submit" className="submit-button">บันทึกรหัสผ่านใหม่</button>
            </form>
        </div>
    );
}

export default ChangePasswordScreen;